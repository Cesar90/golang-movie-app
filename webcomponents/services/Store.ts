export type StoreType = {
    jwt: string | null;
    readonly loggedIn: boolean;
};

const store: StoreType = {
    jwt: null,
    get loggedIn(): boolean {
        return this.jwt !== null;
    }
};

const proxiedStore = new Proxy<StoreType>(store, {
    set: (target, prop: keyof StoreType, value: string) => {
        if (prop === 'jwt') {
            target[prop] = value;
            localStorage.setItem("jwt", value);
        }
        return true;
    }
});

if (localStorage.getItem("jwt")) {
    // Use proxiedStore to trigger the proxy logic
    proxiedStore.jwt = localStorage.getItem("jwt")!;
}

export default proxiedStore;
export { proxiedStore as Store };