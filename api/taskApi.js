const fetchTasks = async (userId = '604e5f771c7cc13294faccba') => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/get_user_task_list/${userId}`);

  const tasks = await response.json();

  return tasks;
};

const deleteTaskById = async taskId => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/remove_task/${taskId}`);

  return response.status;
};

const updateTaskById = async ({
  taskId,
  taskDate,
  title,
  description,
  timeStart,
  timeEnd,
  place,
  type,
  goal
}) => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/update_task/${taskId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      task_date: taskDate,
      title,
      description,
      time_start: timeStart,
      time_end: timeEnd,
      place,
      type,
      goal
    })
  });

  return response.status;
};
export {
  fetchTasks,
  deleteTaskById,
  updateTaskById
};
