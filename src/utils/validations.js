export const validateString = (str, minLength, maxLength) => {
  if (minLength && str.length < minLength) return false;
  else if (maxLength && str.length > maxLength) return false;

  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password,
  minLength,
  maxLength,
  needsUpperCase,
  needsNumber,
  needsSpecialChar
) => {
  if (minLength && password.length < minLength) return false;
  else if (maxLength && password.length > maxLength) return false;
  else if (needsUpperCase && !/[A-Z]/.test(password)) return false;
  else if (needsNumber && !/\d/.test(password)) return false;
  else if (needsSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return false;

  return true;
};

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);

  if (result.error) return res.status(400).send({ message: result.error });
};

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const validateLoginUser = (req) => {
  const result = {
    error: false,
    message: "",
  };
  const { email, password } = req;
  if (!email || !validateEmail(email))
    return {
      error: true,
      message: "Mail invalido",
    };
  else if (!password || !validatePassword(password, 7, null, true, true)) {
    return {
      error: true,
      message: "Contraseña invalida",
    };
  }
  return result;
};

export const createNewUser = async (req, res) => {
  const result = validateRegisterUser(req.body);

  if (result.error) return res.status(400).send({ message: result.error });
};

const validateRegisterUser = (req) => {
  const result = {
    error: false,
    message: "",
  };

  const { name, email, birthDate, password } = req;

  if (!name || name.trim().length < 3) {
    return {
      error: true,
      message: "El nombre debe tener al menos 3 caracteres.",
    };
  }

  if (!email || !validateEmail(email)) {
    return {
      error: true,
      message: "Email inválido.",
    };
  }

  if (!birthDate || !isValidDate(birthDate)) {
    return {
      error: true,
      message: "Fecha de nacimiento inválida.",
    };
  }

  const isOverMinimumAge = (birthDate, minAge) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    return (
      age > minAge ||
      (age === minAge && m >= 0 && today.getDate() >= birth.getDate())
    );
  };

  if (!isOverMinimumAge(birthDate, 13)) {
    return {
      error: true,
      message: "Debes tener al menos 13 años para registrarte.",
    };
  }

  return result;
};
