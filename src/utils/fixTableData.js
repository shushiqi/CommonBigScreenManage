/**
 * 
 * @param {Array} data 
 * @param {number} type 
 * @returns 
 */
export function pushType(data, type) {
  data.map((item) => {
    return (item.type = type);
  });
  return data;
}

/**
 * 
 * @param {String} str 
 * @returns 
 */
export function replaceSQLString(str) {
  return str.replace(/\"/g, "%22")
    .replace(/\%/g, "%25")
    .replace(/\=/g, "%3D")
    .replace(/\#/g, "%23")
    .replace(/\&/g, "%26")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\+/g, "%2B")
    .replace(/\,/g, "%2C")
    .replace(/\//g, "%2F")
    .replace(/\:/g, "%3A")
    .replace(/\;/g, "%3B")
    .replace(/\</g, "%3C")
    .replace(/\>/g, "%3E")
    .replace(/\?/g, "%3F")
    .replace(/\@/g, "%40")
    .replace(/\\/g, "%5C")
    .replace(/\|/g, "%7C");
}


