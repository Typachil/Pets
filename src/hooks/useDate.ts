export const getTime = (date?: string): string => {
    let dateFormat;
    dateFormat = new Date();
    if (date) dateFormat = new Date(date);

    let minutes: number | string = dateFormat.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    return `${dateFormat.getHours()}:${minutes}`;
};

export const getDate = (): string => {
    const date = new Date();

    let dd: number | string = date.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm: number | string = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    let yy: number | string = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
};
