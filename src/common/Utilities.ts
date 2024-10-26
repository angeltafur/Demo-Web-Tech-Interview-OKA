export class Utilities {
    public async formatString(template: string, ...args: any[]): Promise<string> {
        let index = 0;
        return template.replace(/%s/g, () => {
            const value = index < args.length ? args[index++] : '';
            return String(value);
        });
    }
}