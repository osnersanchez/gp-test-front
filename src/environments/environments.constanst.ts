export class Environments {
    public static islocal = false;

    public static local = 'http://192.168.0.110/jwt/public';

    public static production = 'https://api-goodpanda.crakenlab.com';

    public static ENDPOINT = Environments.islocal
        ? Environments.local
        : Environments.production;
    public static API_ENDPOINT = `${Environments.ENDPOINT}/api`;
    public static SERVICES_ENDPOINT = `${Environments.ENDPOINT}/services`;
    public static ODATA_ENDPOINT = `${Environments.ENDPOINT}/odata`;
}
