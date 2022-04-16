export const getTwitterUserId = async (username) => {
  try {
    const response = await fetch("/api/twitterid", {
      method: "POST",
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const responseError = {
        statusText: response.statusText,
        status: response.status,
      };
      throw responseError;
    }

    const user = await response.json();
    console.log(user);

    if(user.errors){
        return { error: 'account not found', success: false };
    }
    return { ...user, success: true };
  } catch (error) {
    return { ...error, success: false };
  }

};
