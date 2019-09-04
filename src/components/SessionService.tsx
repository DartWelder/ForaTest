export default class SessionService {
    static SetItem(key: string, data: any): void {
        window.sessionStorage.setItem(key, data.toString());
    }

    static GetItem<T>(key: string): T | null {
        let data: string | null = window.sessionStorage.getItem(key);
        if (data !== null) {
            try {
                let result: T = JSON.parse(data);
                return result;
            } catch (error) {
                return null;
            }
        }
        return null;
    }
}