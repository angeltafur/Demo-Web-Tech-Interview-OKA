export class Utilities {
    public formatString(template: string, ...args: any[]): string {
        let index = 0;
        return template.replace(/%s/g, () => {
            const value = index < args.length ? args[index++] : '';
            return String(value);
        });
    }
}