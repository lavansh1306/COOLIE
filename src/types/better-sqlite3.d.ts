declare module "better-sqlite3" {
  class Database {
    constructor(filename: string);
    pragma(statement: string): void;
    exec(sql: string): void;
    prepare<T = unknown>(sql: string): {
      get(...params: unknown[]): T | undefined;
      all(...params: unknown[]): T[];
      run(...params: unknown[]): { changes: number; lastInsertRowid: number };
    };
  }

  export default Database;
}
