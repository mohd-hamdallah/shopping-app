export class LocalStorgrUtil {
  public static set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public static get(key: string) {
    if (!LocalStorgrUtil.has(key)) {
      throw new Error(`There is no item stored with key = '${key}'`);
    }
    return JSON.parse(localStorage.getItem(key));
  }
  public static remove(key: string) {
    return localStorage.removeItem(key);
  }

  public static has(key: string): boolean {
    return !!localStorage.getItem(key);
  }


}
