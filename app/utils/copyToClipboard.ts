// utils/copyToClipboard.ts
export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
    });
};
