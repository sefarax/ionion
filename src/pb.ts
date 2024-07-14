import PocketBase from 'pocketbase';

export async function authenticate() {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);
    
    const username = 'users92568';
    const password = 'asdasdasd';

    console.log('----------------------')
    console.log(username)
    console.log(password)
    console.log('----------------------')

    const authData = await pb.collection('users').authWithPassword(username, password);

    // after the above you can also access the auth data from the authStore
    console.log("auth valid:", pb.authStore.isValid);
    console.log("auth token:", pb.authStore.token);
    console.log("auth isAuthRecord:", pb.authStore.isAuthRecord);

    return pb;
};

export async function establishConnection() {
    const pb = new PocketBase(process.env.DB_HOST);
    
    console.log('----------------------')
    console.log(process.env.DB_HOST)
    console.log(process.env.DB_ADMIN_USER)
    console.log(process.env.DB_ADMIN_PASS)
    console.log('----------------------')

    const authData = await pb.admins.authWithPassword(process.env.DB_ADMIN_USER, process.env.DB_ADMIN_PASS);

    // after the above you can also access the auth data from the authStore
    console.log("auth valid:", pb.authStore.isValid);
    console.log("auth token:", pb.authStore.token);
    console.log("auth isAuthRecord:", pb.authStore.isAuthRecord);

    return pb;
};

export function closeConnection(pb: PocketBase) {
    // "logout" the last authenticated account
    return pb.authStore.clear();
}