function ReversePartOfArray(A, i) {
  if (A && A.length > 1 && i > 0 && i < A.length) {
    let temp;
    for (let index = 0; index < i / 2; index++) {
      temp = A[index];
      A[index] = A[i - index];
      A[i - index] = temp;
    }
  }
  return A;
}

function PancakeSort(A) {
  if (A && A.length > 1) {
    let sortingPosition = A.length - 1;
    while (sortingPosition != 0) {
      let sortNumber = 0;
      let sortIndex;

      for (let index = 0; index <= sortingPosition; index++) {
        if (A[index] > sortNumber && index <= sortingPosition) {
          sortNumber = A[index];
          sortIndex = index;
        }
      }

      switch (sortIndex) {
        case 0:
          A = ReversePartOfArray(A, sortingPosition);
          break;

        case sortingPosition:
          break;

        default:
          A = ReversePartOfArray(A, sortIndex);
          A = ReversePartOfArray(A, sortingPosition);
      }

      sortingPosition -= 1;
    }
  }

  return A;
}

console.log(PancakeSort([12, 6, 8, 7, 5, 14, 1, 4]));
