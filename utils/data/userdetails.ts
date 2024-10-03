
const fetchUserData = async (userId: string) => {
    try {
        const response = await fetch(`/api/user?userId=${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export default fetchUserData