
export const FormHandler = (event: any, fieldsArray: string[] = [], changes: any = false, files: any = false) => {
  event?.preventDefault();
  const obj: any = {};
  for (let i = 0; i < fieldsArray.length; i++) {
    try {
      const value = event?.target[fieldsArray[i]]?.value as string;
      if (value) {
        if (changes && changes.rename.includes(fieldsArray[i])) {
          obj[changes.to] = value;
        } else {
          if (fieldsArray[i] === 'dateOfBirth') {
            obj[fieldsArray[i]] = new Date(value).toISOString();
          } else {
            if (files && files.includes(fieldsArray[i])) {
              obj[fieldsArray[i]] = event?.target[fieldsArray[i]]?.files[0];
            } else {
              obj[fieldsArray[i]] = value;
            }
          }
        }
      }
    } catch (error) { }
  }
  return obj;
}

export const FormClear = (event: any, fieldsArray: string[] = []) => {
  event?.preventDefault();
  for (let i = 0; i < fieldsArray.length; i++) {
    try {
      event.target[fieldsArray[i]].value = '';
    } catch (error) { }
  }
}


export const FormError = (obj: { errorType: string, errorMessage: string }) => {
  return { [obj.errorType]: { error: true, errorMessage: obj.errorType === 'UserInputError' ? "check form fields for invalid input" : obj.errorMessage } }
}