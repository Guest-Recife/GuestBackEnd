export default class YupUtils {
  static isCPFValid() {
    return cpf => {
      if (!cpf) return true;

      cpf = cpf.replace(/[^\d]+/g,'');

      if (cpf === '') return false;

      if (cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999')
        return false;

      let add = 0;

      for (let i = 0; i < 9; i ++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
      }

      let rev = 11 - (add % 11);

      if (rev === 10 || rev === 11) rev = 0;

      if (rev !== parseInt(cpf.charAt(9))) return false;

      add = 0;

      for (let i = 0; i < 10; i ++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
      }

      rev = 11 - (add % 11);

      if (rev === 10 || rev === 11) rev = 0;

      if (rev !== parseInt(cpf.charAt(10))) return false;

      return true;
    };
  }

  static isCNPJValid() {
    return cnpj => {
      if (!cnpj) return false;

      const isString = typeof cnpj === 'string';
      const validTypes = isString || Number.isInteger(cnpj) || Array.isArray(cnpj);

      if (!validTypes) return false;

      if (isString) {

        if (cnpj.length > 18) return false;

        const digitsOnly = /^\d{14}$/.test(cnpj);
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpj);

        if (digitsOnly || validFormat) true;
        else return false;
      }

      const match = cnpj.toString().match(/\d/g);
      const numbers = Array.isArray(match) ? match.map(Number) : [];

      if (numbers.length !== 14) return false;

      const items = [...new Set(numbers)];
      if (items.length === 1) return false;


      const calc = x => {
        const slice = numbers.slice(0, x);
        let factor = x - 7;
        let sum = 0;

        for (let i = x; i >= 1; i--) {
          const n = slice[x - i];

          sum += n * factor--;

          if (factor < 2) factor = 9;
        }

        const result = 11 - (sum % 11);

        return result > 9 ? 0 : result;
      };

      const digits = numbers.slice(12);


      const digit0 = calc(12);
      if (digit0 !== digits[0]) return false;


      const digit1 = calc(13);
      return digit1 === digits[1];
    };
  }
}
