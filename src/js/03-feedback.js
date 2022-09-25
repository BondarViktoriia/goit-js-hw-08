import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

initPage();

const onFormInput = e => {
  const { name, value } = e.target;
  
      let saveData = load(LOCAL_STORAGE_KEY);
      saveData = saveData ? saveData : {};
    saveData[name] = value;
      save(LOCAL_STORAGE_KEY, saveData);
   
};

const throttleOnFormInpute = throttle(onFormInput, 500);
formRef.addEventListener('input', throttleOnFormInpute);

function initPage() {
    const saveData = load(LOCAL_STORAGE_KEY);

  if (!saveData) {
    return;
  }
     Object.entries(saveData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
}

function onHandleSUbmit(e) {
    e.preventDefault();
    
    const { elements: { email, message } } = e.currentTarget;
   console.log({email: email.value, message: message.value });
    e.currentTarget.reset();
    remove(LOCAL_STORAGE_KEY);
}
formRef.addEventListener('submit', onHandleSUbmit);