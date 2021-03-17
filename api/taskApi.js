const fetchTasks = async (userId = '604e5f771c7cc13294faccba') => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/get_user_task_list/${userId}`);

  const tasks = await response.json();

  return tasks;
};

const deleteTaskById = async (taskId, userId = '604e5f771c7cc13294faccba') => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/remove_task/${taskId}/${userId}`);

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

const createTask = async ({
  taskDate,
  title,
  description,
  timeStart,
  timeEnd,
  place,
  type,
  goal,
  userId = '604e5f771c7cc13294faccba'
}) => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/create_task/${userId}`, {
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

const getAllAnalitics = async (userId = '604e5f771c7cc13294faccba') => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/get_all_analitics/${userId}`);

  const analitics = await response.json();

  return analitics;
};

const updateSprintAnalitics = async (userId = '604e5f771c7cc13294faccba', quater, itemsLength) => {
  const response = await fetch(`https://pure-oasis-02983.herokuapp.com/update_sprint_analitics/${userId}/${quater}/${itemsLength}`);

  return response.status;
};

export {
  fetchTasks,
  deleteTaskById,
  updateTaskById,
  createTask,
  getAllAnalitics,
  updateSprintAnalitics
};
