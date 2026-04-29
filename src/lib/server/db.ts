import "server-only";

import bcrypt from "bcryptjs";
import initSqlJs from "sql.js";
import { mkdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { BOOKINGS as SEED_BOOKINGS, PORTER_JOBS as SEED_PORTER_JOBS, PORTERS as SEED_PORTERS, STATS as SEED_STATS } from "@/lib/data";

export type Role = "passenger" | "porter" | "admin";
export type BookingStatus = "pending" | "active" | "completed" | "cancelled";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  station: string | null;
  available: boolean;
  rating: number | null;
  reviews: number | null;
  price: number | null;
  experience: string | null;
  completedJobs: number | null;
  badge: string | null;
}

export interface PorterCardRecord {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  available: boolean;
  experience: string;
  completedJobs: number;
  badge: string | null;
  station: string;
}

export interface BookingRecord {
  id: string;
  customerUserId: string | null;
  passenger: string;
  porterUserId: string;
  porter: string;
  porterAvatar: string;
  from: string;
  to: string;
  station: string;
  status: BookingStatus;
  amount: number;
  date: string;
  pnr: string;
  rating: number | null;
  feedback: string | null;
  luggage: string;
  paymentMethod: string;
  upiId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformStats {
  totalPassengers: string;
  verifiedPorters: string;
  citiesCovered: string;
  avgRating: string;
}

export interface PorterDashboardSummary {
  today: number;
  thisWeek: number;
  totalJobs: number;
  rating: number;
  completionRate: number;
  reviewsCount: number;
  monthEarnings: number;
}

export interface PorterJobRecord {
  id: string;
  passenger: string;
  from: string;
  to: string;
  luggage: string;
  amount: number;
  status: BookingStatus;
  time: string;
  createdAt: string;
}

export interface PorterHistoryRecord {
  id: string;
  passenger: string;
  from: string;
  to: string;
  date: string;
  amount: number;
  rating: number | null;
  feedback: string | null;
}

export interface AdminDashboardData {
  bookings: BookingRecord[];
  porters: PorterCardRecord[];
  summary: {
    totalBookings: number;
    activePorters: number;
    revenue: number;
    completionRate: number;
  };
}

export interface CustomerDashboardData {
  bookings: BookingRecord[];
  porters: PorterCardRecord[];
}

const DATABASE_DIR = join(process.cwd(), "data");
const DATABASE_PATH = join(DATABASE_DIR, "coolie.sqlite");
const SESSION_COOKIE = "coolie-session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

type SqlValue = string | number | null | Uint8Array;
type BindParams = SqlValue[] | Record<string, SqlValue>;

interface SqlJsStatement {
  bind(params?: BindParams): void;
  step(): boolean;
  getAsObject(): Record<string, unknown>;
  run(params?: BindParams): void;
  free(): void;
}

interface SqlJsDatabase {
  exec(sql: string): unknown;
  prepare(sql: string): SqlJsStatement;
  export(): Uint8Array;
}

interface SqlJsModule {
  Database: new (data?: Uint8Array) => SqlJsDatabase;
}

mkdirSync(DATABASE_DIR, { recursive: true });

let databasePromise: Promise<SqlJsDatabase> | null = null;

function locateSqlJsFile(file: string) {
  return join(process.cwd(), "node_modules/sql.js/dist", file);
}

async function loadDatabaseModule(): Promise<SqlJsModule> {
  return initSqlJs({ locateFile: locateSqlJsFile }) as Promise<SqlJsModule>;
}

async function persistDatabase(database: SqlJsDatabase) {
  await writeFile(DATABASE_PATH, Buffer.from(database.export()));
}

function bindStatement(statement: SqlJsStatement, params?: BindParams) {
  if (params !== undefined) {
    statement.bind(params);
  }
}

function selectOne<T extends Record<string, unknown>>(database: SqlJsDatabase, sql: string, params?: BindParams) {
  const statement = database.prepare(sql);
  try {
    bindStatement(statement, params);
    if (!statement.step()) {
      return undefined;
    }

    return statement.getAsObject() as T;
  } finally {
    statement.free();
  }
}

function selectAll<T extends Record<string, unknown>>(database: SqlJsDatabase, sql: string, params?: BindParams) {
  const statement = database.prepare(sql);
  const rows: T[] = [];

  try {
    bindStatement(statement, params);
    while (statement.step()) {
      rows.push(statement.getAsObject() as T);
    }
  } finally {
    statement.free();
  }

  return rows;
}

async function execute(database: SqlJsDatabase, sql: string, params?: BindParams) {
  const statement = database.prepare(sql);
  try {
    bindStatement(statement, params);
    statement.step();
  } finally {
    statement.free();
  }
}

function nowIso() {
  return new Date().toISOString();
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function minutesAgo(minutes: number) {
  return new Date(Date.now() - minutes * 60 * 1000);
}

function isoDate(date: Date) {
  return date.toISOString();
}

function bookingDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "C")
    .join("");
}

function createId(prefix: string, length = 6) {
  const digits = Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, "0");
  return `${prefix}${digits}`;
}

function mapUser(row: Record<string, unknown>): AuthUser {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    role: row.role as Role,
    avatar: String(row.avatar),
    station: row.station ? String(row.station) : null,
    available: Boolean(row.available),
    rating: row.rating === null || row.rating === undefined ? null : Number(row.rating),
    reviews: row.reviews === null || row.reviews === undefined ? null : Number(row.reviews),
    price: row.price === null || row.price === undefined ? null : Number(row.price),
    experience: row.experience ? String(row.experience) : null,
    completedJobs: row.completed_jobs === null || row.completed_jobs === undefined ? null : Number(row.completed_jobs),
    badge: row.badge ? String(row.badge) : null,
  };
}

function mapPorter(row: Record<string, unknown>): PorterCardRecord {
  return {
    id: String(row.id),
    name: String(row.name),
    avatar: String(row.avatar),
    rating: Number(row.rating ?? 0),
    reviews: Number(row.reviews ?? 0),
    price: Number(row.price ?? 0),
    distance: String(row.station ?? "Platform"),
    available: Boolean(row.available),
    experience: String(row.experience ?? "0 yrs"),
    completedJobs: Number(row.completed_jobs ?? 0),
    badge: row.badge ? String(row.badge) : null,
    station: String(row.station ?? ""),
  };
}

function mapBooking(row: Record<string, unknown>): BookingRecord {
  return {
    id: String(row.id),
    customerUserId: row.customer_user_id ? String(row.customer_user_id) : null,
    passenger: String(row.passenger_name),
    porterUserId: String(row.porter_user_id),
    porter: String(row.porter_name),
    porterAvatar: String(row.porter_avatar),
    from: String(row.from_station),
    to: String(row.to_location),
    station: String(row.station),
    status: row.status as BookingStatus,
    amount: Number(row.amount),
    date: String(row.booking_date),
    pnr: String(row.pnr),
    rating: row.rating === null || row.rating === undefined ? null : Number(row.rating),
    feedback: row.feedback ? String(row.feedback) : null,
    luggage: String(row.luggage),
    paymentMethod: String(row.payment_method),
    upiId: row.upi_id ? String(row.upi_id) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

async function ensureSchema(database: SqlJsDatabase) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('passenger', 'porter', 'admin')),
      avatar TEXT NOT NULL,
      station TEXT,
      available INTEGER NOT NULL DEFAULT 1,
      rating REAL,
      reviews INTEGER,
      price INTEGER,
      experience TEXT,
      completed_jobs INTEGER,
      badge TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      customer_user_id TEXT,
      passenger_name TEXT NOT NULL,
      porter_user_id TEXT NOT NULL,
      porter_name TEXT NOT NULL,
      porter_avatar TEXT NOT NULL,
      from_station TEXT NOT NULL,
      to_location TEXT NOT NULL,
      station TEXT NOT NULL,
      luggage TEXT NOT NULL,
      amount INTEGER NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
      booking_date TEXT NOT NULL,
      pnr TEXT NOT NULL,
      rating INTEGER,
      feedback TEXT,
      payment_method TEXT NOT NULL,
      upi_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (customer_user_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (porter_user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS platform_metrics (
      metric_key TEXT PRIMARY KEY,
      metric_value TEXT NOT NULL
    );
  `);
}

async function seedIfNeeded(database: SqlJsDatabase) {
  const countRow = selectOne<{ count: number }>(database, "SELECT COUNT(*) AS count FROM users");
  if ((countRow?.count ?? 0) > 0) {
    return;
  }

  const porterMap = new Map<string, string>();
  const passengerMap = new Map<string, string>();
  const porterStationByName: Record<string, string> = {
    "Ramesh Kumar": "New Delhi Railway Station",
    "Suresh Yadav": "Mumbai CST",
    "Mohan Singh": "Bangalore City Junction",
    "Dinesh Patel": "Chennai Central",
  };

  for (const porter of SEED_PORTERS) {
    const id = `porter_${slugify(porter.name)}`;
    porterMap.set(porter.name, id);
    await execute(
      database,
      `INSERT INTO users (
        id, name, email, password_hash, role, avatar, station, available,
        rating, reviews, price, experience, completed_jobs, badge, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        porter.name,
        `${slugify(porter.name)}@coolie.demo`,
        bcrypt.hashSync("password123", 10),
        "porter",
        porter.avatar,
        porterStationByName[porter.name] ?? "New Delhi Railway Station",
        porter.available ? 1 : 0,
        porter.rating,
        porter.reviews,
        porter.price,
        porter.experience,
        porter.completedJobs,
        porter.badge,
        nowIso(),
        nowIso(),
      ]
    );
  }

  const bookingPeople = new Set<string>();
  for (const booking of SEED_BOOKINGS) bookingPeople.add(booking.passenger);
  for (const job of SEED_PORTER_JOBS) bookingPeople.add(job.passenger);

  for (const passenger of bookingPeople) {
    const id = `passenger_${slugify(passenger)}`;
    passengerMap.set(passenger, id);
    await execute(
      database,
      `INSERT INTO users (
        id, name, email, password_hash, role, avatar, station, available,
        rating, reviews, price, experience, completed_jobs, badge, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        passenger,
        `${slugify(passenger)}@coolie.demo`,
        bcrypt.hashSync("password123", 10),
        "passenger",
        initials(passenger),
        null,
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        nowIso(),
        nowIso(),
      ]
    );
  }

  await execute(
    database,
    `INSERT INTO users (
      id, name, email, password_hash, role, avatar, station, available,
      rating, reviews, price, experience, completed_jobs, badge, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "admin_coolie",
      "Coolie Admin",
      "admin@coolie.demo",
      bcrypt.hashSync("admin123", 10),
      "admin",
      "CA",
      null,
      1,
      null,
      null,
      null,
      null,
      null,
      null,
      nowIso(),
      nowIso(),
    ]
  );

  const bookingSeedData = [
    {
      ...SEED_BOOKINGS[0],
      station: "New Delhi Railway Station",
      from: "New Delhi Railway Station",
      porterAvatar: "RK",
      porterUserId: porterMap.get("Ramesh Kumar") ?? "porter_ramesh_kumar",
      luggage: "2 bags",
      paymentMethod: "upi",
      upiId: "",
      feedback: "Very helpful and punctual. Handled my luggage with care.",
      createdAt: isoDate(daysAgo(2)),
      updatedAt: isoDate(daysAgo(2)),
      date: bookingDate(daysAgo(2)),
    },
    {
      ...SEED_BOOKINGS[1],
      station: "Mumbai CST",
      from: "Mumbai CST",
      porterAvatar: "SY",
      porterUserId: porterMap.get("Suresh Yadav") ?? "porter_suresh_yadav",
      luggage: "1 trolley",
      paymentMethod: "card",
      upiId: null,
      feedback: null,
      createdAt: isoDate(daysAgo(1)),
      updatedAt: isoDate(daysAgo(1)),
      date: bookingDate(daysAgo(1)),
    },
    {
      ...SEED_BOOKINGS[2],
      station: "Bangalore City Junction",
      from: "Bangalore City Junction",
      porterAvatar: "MS",
      porterUserId: porterMap.get("Mohan Singh") ?? "porter_mohan_singh",
      luggage: "1 bag",
      paymentMethod: "wallet",
      upiId: null,
      feedback: null,
      createdAt: isoDate(daysAgo(0)),
      updatedAt: isoDate(daysAgo(0)),
      date: bookingDate(daysAgo(0)),
    },
    {
      ...SEED_BOOKINGS[3],
      station: "Chennai Central",
      from: "Chennai Central",
      porterAvatar: "RK",
      porterUserId: porterMap.get("Ramesh Kumar") ?? "porter_ramesh_kumar",
      luggage: "2 bags",
      paymentMethod: "upi",
      upiId: null,
      feedback: "Excellent service! Will definitely book again.",
      createdAt: isoDate(daysAgo(3)),
      updatedAt: isoDate(daysAgo(3)),
      date: bookingDate(daysAgo(3)),
    },
  ];

  for (const seed of bookingSeedData) {
    await execute(
      database,
      `INSERT INTO bookings (
        id, customer_user_id, passenger_name, porter_user_id, porter_name, porter_avatar,
        from_station, to_location, station, luggage, amount, status, booking_date, pnr,
        rating, feedback, payment_method, upi_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        seed.id,
        passengerMap.get(seed.passenger) ?? null,
        seed.passenger,
        seed.porterUserId,
        seed.porter,
        seed.porterAvatar,
        seed.from,
        seed.to,
        seed.station,
        seed.luggage,
        seed.amount,
        seed.status,
        seed.date,
        seed.pnr,
        seed.rating,
        seed.feedback,
        seed.paymentMethod,
        seed.upiId,
        seed.createdAt,
        seed.updatedAt,
      ]
    );
  }

  for (const job of SEED_PORTER_JOBS) {
    const id = createId("J");
    const createdAt = isoDate(minutesAgo(job.time === "2 min ago" ? 2 : 5));
    await execute(
      database,
      `INSERT INTO bookings (
        id, customer_user_id, passenger_name, porter_user_id, porter_name, porter_avatar,
        from_station, to_location, station, luggage, amount, status, booking_date, pnr,
        rating, feedback, payment_method, upi_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        passengerMap.get(job.passenger) ?? null,
        job.passenger,
        porterMap.get("Ramesh Kumar") ?? "porter_ramesh_kumar",
        "Ramesh Kumar",
        "RK",
        job.from,
        job.to,
        "New Delhi Railway Station",
        job.luggage,
        job.amount,
        "pending",
        bookingDate(daysAgo(0)),
        `PNR${id.slice(1)}`,
        null,
        null,
        "upi",
        null,
        createdAt,
        createdAt,
      ]
    );
  }

  for (const [metricKey, metricValue] of [
    ["totalPassengers", SEED_STATS.totalPassengers],
    ["totalPorters", SEED_STATS.totalPorters],
    ["citiesCovered", SEED_STATS.citiesCovered],
    ["avgRating", SEED_STATS.avgRating],
  ] as const) {
    await execute(database, "INSERT INTO platform_metrics (metric_key, metric_value) VALUES (?, ?)", [metricKey, metricValue]);
  }

  await persistDatabase(database);
}

async function initializeDatabase() {
  const SQL = await loadDatabaseModule();
  let database: SqlJsDatabase;

  try {
    const file = await readFile(DATABASE_PATH);
    database = new SQL.Database(file);
  } catch {
    database = new SQL.Database();
  }

  await ensureSchema(database);
  await seedIfNeeded(database);
  await persistDatabase(database);
  return database;
}

async function getDatabase() {
  if (!databasePromise) {
    databasePromise = initializeDatabase();
  }

  return databasePromise;
}

async function withDatabase<T>(callback: (database: SqlJsDatabase) => Promise<T>) {
  const database = await getDatabase();
  return callback(database);
}

export async function getSessionUser(token?: string | null) {
  if (!token) {
    return null;
  }

  return withDatabase(async (database) => {
    const session = selectOne<{ token: string; user_id: string; expires_at: string }>(database, "SELECT * FROM sessions WHERE token = ?", [token]);
    if (!session) {
      return null;
    }

    if (new Date(session.expires_at).getTime() <= Date.now()) {
      await execute(database, "DELETE FROM sessions WHERE token = ?", [token]);
      await persistDatabase(database);
      return null;
    }

    const user = selectOne<Record<string, unknown>>(database, "SELECT * FROM users WHERE id = ?", [session.user_id]);
    return user ? mapUser(user) : null;
  });
}

export async function authenticateUser(email: string, password: string, role?: Role) {
  return withDatabase(async (database) => {
    const user = selectOne<Record<string, unknown>>(database, "SELECT * FROM users WHERE lower(email) = lower(?)", [email]);
    if (!user) {
      return null;
    }

    if (role && user.role !== role) {
      return null;
    }

    if (!bcrypt.compareSync(password, String(user.password_hash))) {
      return null;
    }

    return mapUser(user);
  });
}

export async function createSession(userId: string) {
  return withDatabase(async (database) => {
    const token = randomUUID();
    const createdAt = nowIso();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

    await execute(database, "INSERT INTO sessions (token, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)", [token, userId, expiresAt, createdAt]);
    await persistDatabase(database);

    return { token, expiresAt };
  });
}

export async function deleteSession(token: string) {
  return withDatabase(async (database) => {
    await execute(database, "DELETE FROM sessions WHERE token = ?", [token]);
    await persistDatabase(database);
  });
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Exclude<Role, "admin">;
  station?: string | null;
  price?: number | null;
  experience?: string | null;
}) {
  return withDatabase(async (database) => {
    const existingUser = selectOne<Record<string, unknown>>(database, "SELECT * FROM users WHERE lower(email) = lower(?)", [input.email]);
    if (existingUser) {
      throw new Error("EMAIL_EXISTS");
    }

    const now = nowIso();
    const id = `${input.role}_${slugify(input.name)}_${randomUUID().slice(0, 8)}`;
    const avatar = initials(input.name);
    const passwordHash = bcrypt.hashSync(input.password, 10);

    await execute(
      database,
      `INSERT INTO users (
        id, name, email, password_hash, role, avatar, station, available,
        rating, reviews, price, experience, completed_jobs, badge, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        input.name,
        input.email,
        passwordHash,
        input.role,
        avatar,
        input.station ?? null,
        1,
        input.role === "porter" ? 0 : null,
        input.role === "porter" ? 0 : null,
        input.role === "porter" ? input.price ?? 70 : null,
        input.role === "porter" ? input.experience ?? "1 yr" : null,
        input.role === "porter" ? 0 : null,
        input.role === "porter" ? "Verified" : null,
        now,
        now,
      ]
    );

    await persistDatabase(database);
    const createdUser = selectOne<Record<string, unknown>>(database, "SELECT * FROM users WHERE id = ?", [id]);
    if (!createdUser) {
      throw new Error("USER_CREATE_FAILED");
    }

    return mapUser(createdUser);
  });
}

export async function listPorters(station?: string | null) {
  return withDatabase(async (database) => {
    const rows = station
      ? selectAll<Record<string, unknown>>(database, "SELECT * FROM users WHERE role = 'porter' AND station = ? ORDER BY available DESC, rating DESC", [station])
      : selectAll<Record<string, unknown>>(database, "SELECT * FROM users WHERE role = 'porter' ORDER BY available DESC, rating DESC");

    return rows.map(mapPorter);
  });
}

export async function getPlatformStats() {
  return withDatabase(async (database) => {
    const metrics = selectAll<{ metric_key: string; metric_value: string }>(database, "SELECT * FROM platform_metrics");
    const metricMap = new Map(metrics.map((metric) => [metric.metric_key, metric.metric_value]));

    return {
      totalPassengers: metricMap.get("totalPassengers") ?? "0",
      verifiedPorters: metricMap.get("totalPorters") ?? "0",
      citiesCovered: metricMap.get("citiesCovered") ?? "0",
      avgRating: metricMap.get("avgRating") ?? "0",
    };
  });
}

export async function listCustomerBookings(customerUserId: string) {
  return withDatabase(async (database) => {
    const rows = selectAll<Record<string, unknown>>(database, "SELECT * FROM bookings WHERE customer_user_id = ? ORDER BY created_at DESC", [customerUserId]);
    return rows.map(mapBooking);
  });
}

export async function createBooking(input: {
  customerUserId: string;
  passengerName: string;
  porterUserId: string;
  station: string;
  dropLocation: string;
  pnr: string;
  amount: number;
  negotiatedPrice?: number | null;
  payMethod: string;
  upiId?: string | null;
  luggage?: string;
}) {
  return withDatabase(async (database) => {
    const porter = selectOne<Record<string, unknown>>(database, "SELECT * FROM users WHERE id = ?", [input.porterUserId]);
    if (!porter || porter.role !== "porter") {
      throw new Error("PORTER_NOT_FOUND");
    }

    const bookingId = `BK${Math.floor(Math.random() * 900000 + 100000)}`;
    const now = nowIso();
    const bookingDateValue = now.slice(0, 10);

    await execute(
      database,
      `INSERT INTO bookings (
        id, customer_user_id, passenger_name, porter_user_id, porter_name, porter_avatar,
        from_station, to_location, station, luggage, amount, status, booking_date, pnr,
        rating, feedback, payment_method, upi_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingId,
        input.customerUserId,
        input.passengerName,
        input.porterUserId,
        String(porter.name),
        String(porter.avatar),
        input.station,
        input.dropLocation,
        input.station,
        input.luggage ?? "1 bag",
        input.negotiatedPrice ?? input.amount,
        "pending",
        bookingDateValue,
        input.pnr,
        null,
        null,
        input.payMethod,
        input.upiId ?? null,
        now,
        now,
      ]
    );

    await persistDatabase(database);
    const booking = selectOne<Record<string, unknown>>(database, "SELECT * FROM bookings WHERE id = ?", [bookingId]);
    if (!booking) {
      throw new Error("BOOKING_CREATE_FAILED");
    }

    return mapBooking(booking);
  });
}

export async function updateBookingStatus(input: {
  bookingId: string;
  userId: string;
  role: Role;
  status: BookingStatus;
}) {
  return withDatabase(async (database) => {
    const booking = selectOne<Record<string, unknown>>(database, "SELECT * FROM bookings WHERE id = ?", [input.bookingId]);
    if (!booking) {
      throw new Error("BOOKING_NOT_FOUND");
    }

    if (input.role === "porter" && String(booking.porter_user_id) !== input.userId) {
      throw new Error("FORBIDDEN");
    }

    if (input.role === "passenger" && booking.customer_user_id !== null && String(booking.customer_user_id) !== input.userId) {
      throw new Error("FORBIDDEN");
    }

    const now = nowIso();
    await execute(database, "UPDATE bookings SET status = ?, updated_at = ? WHERE id = ?", [input.status, now, input.bookingId]);
    await persistDatabase(database);

    const updated = selectOne<Record<string, unknown>>(database, "SELECT * FROM bookings WHERE id = ?", [input.bookingId]);
    if (!updated) {
      throw new Error("BOOKING_UPDATE_FAILED");
    }

    return mapBooking(updated);
  });
}

function sumBookings(rows: Record<string, unknown>[], days: number) {
  const limit = new Date();
  limit.setDate(limit.getDate() - days);

  return rows.reduce((sum, row) => {
    if (new Date(String(row.created_at)).getTime() >= limit.getTime()) {
      return sum + Number(row.amount);
    }

    return sum;
  }, 0);
}

function timeAgoLabel(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));
  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hr ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

export async function getPorterDashboard(porterUserId: string) {
  return withDatabase(async (database) => {
    const porter = selectOne<Record<string, unknown>>(database, "SELECT * FROM users WHERE id = ?", [porterUserId]);
    if (!porter || porter.role !== "porter") {
      throw new Error("PORTER_NOT_FOUND");
    }

    const bookings = selectAll<Record<string, unknown>>(database, "SELECT * FROM bookings WHERE porter_user_id = ? ORDER BY created_at DESC", [porterUserId]);

    const jobs = bookings
      .filter((booking) => booking.status === "pending" || booking.status === "active")
      .map((booking) => ({
        id: String(booking.id),
        passenger: String(booking.passenger_name),
        from: String(booking.from_station),
        to: String(booking.to_location),
        luggage: String(booking.luggage),
        amount: Number(booking.amount),
        status: booking.status as BookingStatus,
        time: timeAgoLabel(String(booking.created_at)),
        createdAt: String(booking.created_at),
      }));

    const history = bookings
      .filter((booking) => booking.status === "completed")
      .map((booking) => ({
        id: String(booking.id),
        passenger: String(booking.passenger_name),
        from: String(booking.from_station),
        to: String(booking.to_location),
        date: String(booking.booking_date),
        amount: Number(booking.amount),
        rating: booking.rating === null || booking.rating === undefined ? null : Number(booking.rating),
        feedback: booking.feedback ? String(booking.feedback) : null,
      }));

    const ratings = history.filter((booking) => booking.rating !== null);
    const completed = bookings.filter((booking) => booking.status === "completed");
    const totalJobs = bookings.length;
    const completionRate = totalJobs === 0 ? 0 : Math.round((completed.length / totalJobs) * 100);

    return {
      porter: mapPorter(porter),
      summary: {
        today: sumBookings(completed, 0),
        thisWeek: sumBookings(completed, 7),
        totalJobs,
        rating: Number(porter.rating ?? 0),
        completionRate,
        reviewsCount: Number(porter.reviews ?? ratings.length),
        monthEarnings: sumBookings(completed, 30),
      },
      jobs,
      history,
      ratings,
    };
  });
}

export async function getAdminDashboard() {
  return withDatabase(async (database) => {
    const bookings = selectAll<Record<string, unknown>>(database, "SELECT * FROM bookings ORDER BY created_at DESC");
    const porters = selectAll<Record<string, unknown>>(database, "SELECT * FROM users WHERE role = 'porter' ORDER BY available DESC, rating DESC");

    const completed = bookings.filter((booking) => booking.status === "completed");
    const totalBookings = bookings.length;

    return {
      bookings: bookings.map(mapBooking),
      porters: porters.map(mapPorter),
      summary: {
        totalBookings,
        activePorters: porters.filter((porter) => porter.available).length,
        revenue: completed.reduce((sum, booking) => sum + Number(booking.amount), 0),
        completionRate: totalBookings === 0 ? 0 : Math.round((completed.length / totalBookings) * 100),
      },
    };
  });
}

export async function getCustomerDashboard(customerUserId: string) {
  return {
    bookings: await listCustomerBookings(customerUserId),
    porters: await listPorters(),
  };
}

export { SESSION_COOKIE };
