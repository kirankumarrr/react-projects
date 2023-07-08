const myPromise = async () => {
    let arr = [];
    arr.push(fetch(`https://reqres.in/api/users?delay=3`));
    arr.push(fetch(`https://reqres.in/api/users?delay=4`));
    return await Promise.all(arr);
};


export default myPromise