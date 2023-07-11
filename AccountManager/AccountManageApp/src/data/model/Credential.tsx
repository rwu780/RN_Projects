
type CredentialTypes = 'Game' | 'Entertainment' | 'Bank' | 'Misc'


class Credential {

    private id: string
    private credentialTypes: CredentialTypes
    private username: string
    private password: string

    constructor(id: string, username: string, password: string, type: CredentialTypes) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.credentialTypes = type
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

    getCredentialType(): CredentialTypes {
        return this.credentialTypes;
    }
}

export default Credential