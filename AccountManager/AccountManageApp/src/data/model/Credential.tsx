export const CredentialTypesArray = ['Game', 'Entertainment', 'Bank', 'Misc']
export type CredentialTypes = typeof CredentialTypesArray[number];


export class Credential {

    private id: string
    credentialTypes: CredentialTypes
    private platform: string
    private username: string
    private password: string

    constructor(id: string, platform: string, username: string, password: string, type: CredentialTypes) {
        this.id = id;
        this.platform = platform;
        this.username = username;
        this.password = password;
        this.credentialTypes = type
    }

    getPlatform(): string {
        return this.platform
    }

    getId() : string {
        return this.id;
    }

    getUserName(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    public getCredentialType(): string {
        return this.credentialTypes.toString();
    }
}
