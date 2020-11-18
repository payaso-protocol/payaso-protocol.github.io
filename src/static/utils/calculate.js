import precision from './precision.js';
//相乘
export function mul(num1, num2) {
    // return fixD(precision.times(num1, num2), 4);
    var m = 0, r1, r2;
    var s1 = num1.toString();
    var s2 = num2.toString();
    try {
        m += s1.split('.')[1].length
    } catch (e) {

    }
    try {
        m += s2.split('.')[1].length
    } catch (e) {

    }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    let res = r1 * r2 / Math.pow(10, m)
    try {
        if ((res + '').split('.')[1].length >= 4) {
            res = parseFloat(res).toFixed(4)
            res = parseFloat(res)
        }
    } catch (e) {

    }
    return res;
}


//求和
export function add(num1, num2) {
    // return fixD(precision.plus(num1, num2), 4);
    var r1, r2, m;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = num2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    let res = Math.round(num1 * m + num2 * m) / m;
    try {
        if ((res + '').split('.')[1].length >= 4) {
            res = parseFloat(res).toFixed(4)
            res = parseFloat(res)
        }
    } catch (e) {

    }
    return res
}


//相减
export function sub(num1, num2) {
    // return fixD(precision.minus(num1, num2), 4);
    var r1, r2, m, n;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    let res = (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    try {
        if ((res + '').split('.')[1].length >= 4) {
            res = parseFloat(res).toFixed(4)
            res = parseFloat(res)
        }
    } catch (e) {

    }

    return res
}



//相除
export function accDiv(num1, num2) {
    // return precision.divide2(num1, num2);

    var t1, t2, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split('.')[1].length;
    } catch (e) {
        t2 = 0;
    }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    let res = (r1 / r2) * Math.pow(10, t2 - t1);
    try {
        if ((res + '').split('.')[1].length >= 4) {
            res = parseFloat(res).toFixed(4)
            res = parseFloat(res)
        }
    } catch (e) {

    }

    return res
}


// 精确有效数字
export const toPrecision = (num, wei = 2) => {
    let n = Number(num).toPrecision(wei)
    return Number(n)
}


// 精度计算E+处理方法
const fixDEAdd = (num, precision, autoFix = true) => {
  if (`${num}` === '0') {
    // if (!window.parseFloat(precision) || !autoFix) return 0;
    if (!parseFloat(precision) || !autoFix) return 0;
    return '0.'.padEnd(precision + 2, '0');
  }
  if (!num) return '--';

  const number = parseFloat(num);
  const strN = num.toString();
  const flag = number < 0;
  let result = strN;

  if (strN.toLowerCase().indexOf('e') > -1) {
    const n = strN.match(/(\d+?)(?:\.(\d*))?e([+-])(\d+)/);
    const nl = n[1]; // 小数点左边
    const nr = n[2]; // 小数点右边
    const type = n[3]; //  + / -
    const floatN = n[4]; // 科学计数法的位数

    let params = '';
    let pr = nr ? nr.substr(floatN) : '';

    if (pr) pr = `.${pr}`;
    if (type !== '-') {
      for (let i = 0; i < floatN; i += 1) {
        const p = nr[i] || '0';
        params += p;
      }
      result = nl + params + pr;
    } else {
      let strl = '0';
      for (let i = 0; i < floatN; i += 1) {
        const p = nl[nl.length - i - 1] || '0';
        params = p + params;
      }
      if (nl.length > floatN) strl = nl.substr(0, nl.length - floatN);
      result = `${strl}.${params}${nr}`;
    }
  }

  if (precision && autoFix) {
    let pal = `${result.split('.')[0]}.`;
    const par = result.split('.')[1] || '';

    for (let i = 0; i < precision; i += 1) {
      pal += par[i] || '0';
    }
    result = pal;
  }


  if (result.length > 14) {
    const arry = result.split('.');
    if (arry[0].length > 14) {
      result = `${arry[0].slice(0, 14)}+`;
    } else {
      result = result.slice(0, 13);
      if (result.indexOf('.') === 12) {
        result = result.slice(0, 12);
      }
    }
  }

  return `${flag ? '-' : ''}${result}`;
};

// 精度计算
export const fixD = (num, precision) => {
  precision = precision > -1 ? precision : 0;
  // num初始化
  if (`${num}` === '0') {
    // if (!window.parseFloat(precision)) {
    if (!parseFloat(precision)) {
      return 0;
    }
    return '0.'.padEnd(precision + 2, '0');
  }
  if (!num) {
    return '--';
  }
  let flag = false;
  if (parseFloat(num) < 0) {
    flag = true;
  }

  const newnum = `${Math.abs(parseFloat(num))}`;
  if (newnum === 'NaN') {
    return '--';
  }
  let fixNum = newnum;
  // 科学计数法计算
  if (newnum.toLowerCase().indexOf('e') > -1) {
    if (newnum.toLowerCase().indexOf('+') > -1) return fixDEAdd(newnum, precision);
    const a = newnum.toLowerCase().split('e');
    let b = a[0];
    const c = Math.abs(parseFloat(a[1]));
    let d = '';
    let h = b.length;
    let i;
    if (a[0].split('.')[1]) {
      b = a[0].split('.')[0] + a[0].split('.')[1];
      h = a[0].split('.')[0].length;
    }
    for (i = 0; i < c - h; i += 1) {
      d += '0';
    }
    fixNum = `0.${d}${b}`;
  }
  // 精度格式化
  // precision初始化
  if (`${precision}` !== '0' && !precision) {
    return (flag ? '-' : '') + fixNum;
  }
  if (`${parseFloat(num)}` === 'NaN') {
    return (flag ? '-' : '') + fixNum;
  }
  const fNum = fixNum.split('.');
  if (precision === 0) {
    fixNum = parseInt(fixNum, 10);
  } else if (precision > 0 && fNum[1]) {
    if (fNum[1].length > precision) {
      if (fNum[1].indexOf('999999999') > -1) {
        const s = parseFloat(fixNum).toFixed(precision + 1);
        fixNum = s.slice(0, s.length - 1);
      } else {
        fixNum = `${fNum[0]}.${fNum[1].slice(0, precision)}`;
      }
    } else {
      fixNum = parseFloat(fixNum).toFixed(precision);
    }
  } else {
    fixNum = parseFloat(fixNum).toFixed(precision);
  }
  if (fixNum.length >= 14 && fixNum.indexOf('.') > -1) {
    const arry = fixNum.split('.');
    if (arry[0].length > 14) {
      fixNum = `${arry[0].slice(0, 14)}+`;
    } else {
      fixNum = fixNum.slice(0, 13);
      if (fixNum.indexOf('.') === 12) {
        fixNum = fixNum.slice(0, 12);
      }
    }
  }
  return (flag ? '-' : '') + fixNum;
};