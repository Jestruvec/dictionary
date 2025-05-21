export const typeTextLetterByLetter = (
  text: string,
  callback: (value: string) => void,
  delay = 200
): Promise<void> => {
  return new Promise((resolve) => {
    if (text.length === 0) {
      resolve();
      return;
    }

    let index = 0;
    let current = "";

    const type = () => {
      current += text[index];
      callback(current);
      index++;

      if (index < text.length) {
        setTimeout(type, delay);
      } else {
        resolve();
      }
    };

    setTimeout(type, delay);
  });
};
