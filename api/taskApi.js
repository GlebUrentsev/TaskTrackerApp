const fetchTasks = async (userId = '604e5f771c7cc13294faccba') => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/get_user_task_list/${userId}`);

  const tasks = await response.json();

  return tasks;
};
export {
  fetchTasks
};
