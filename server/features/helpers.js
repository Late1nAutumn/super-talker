module.exports = {
  headerCheck: (content, target, ignoreCase = false) => {
    let length = target.length;
    let header = content.slice(0, length + 1).trim(); // avoid spaces
    if (ignoreCase)
      return (
        header.toLowerCase() === target.toLowerCase() &&
        content.slice(length).trim()
      );
    else return header === target && content.slice(length).trim();
  },

  minimumEditDistance: (s1, s2) => {
    // function from: https://www.jianshu.com/p/90af98493661
    const len1 = s1.length;
    const len2 = s2.length;
    let matrix = [];

    for (let i = 0; i <= len1; i++) {
      // 构造二维数组
      matrix[i] = new Array();
      for (let j = 0; j <= len2; j++) {
        // 初始化
        if (i == 0) matrix[i][j] = j;
        else if (j == 0) matrix[i][j] = i;
        else {
          // 进行最小值分析
          // 相同为0，不同置1
          let cost = s1[i - 1] != s2[j - 1] ? 1 : 0;

          const temp = matrix[i - 1][j - 1] + cost;

          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            temp
          );
        }
      }
    }
    return matrix[len1][len2]; //返回右下角的值
  },
};
