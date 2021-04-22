import slugify from 'slugify';

export const capitalizeLine = (text) => {
  return text.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
};

export const slugifyLine = (text) => {
  return slugify(text, { lower: true, strict: true });
};
