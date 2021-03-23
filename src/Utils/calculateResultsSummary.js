export default function calculateResultsSummary(values) {
  let {
    amount,
    interest,
    duration,
  } = values;

  const {
    interest_type: interestType,
  } = values;

  // convert from strings
  amount = parseInt(amount, 10);
  interest = parseFloat(interest);
  duration = parseInt(duration, 10);

  // conjugate years
  // TODO: should be done with a i18n library
  let durationWord;
  if (duration === 1) {
    durationWord = 'rok';
  } else if (duration === 2) {
    durationWord = 'roky';
  } else {
    durationWord = 'let';
  }
  // conjugate interest type
  const interestTypeWord = interestType === 'yearly' ? 'ročního' : 'jednorázového';

  // calculate total amount to be payed at the end
  const actualInterest = interestType === 'yearly' ? interest * duration : interest;
  const total = Math.ceil(amount + amount * (actualInterest / 100));

  return {
    durationWord,
    interestTypeWord,
    total,
  };
}
