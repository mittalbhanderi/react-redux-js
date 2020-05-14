/**
 * Quite inefficenit sorting algorithm to sort any given array. 
 * The idea is to divide the array in two sections. Left and Right. 
 * Left part of the array is sorted.
 * Right part of the array is unsorted array. 
 * So idea is to keep reducing the right part of the array and we get a sorted array. 
 */

 function insertion_sort(A) {
     if(A.length > 2) {
        for(let j = 1; j < A.length; j++) {
            let key = A[j];
            let i = j - 1;
            while(i >= 0 && A[i] > key) {
                A[i+1] = A[i];
                i--;
            }
            A[i + 1] = key;
        }
     }  
     return A;
 }

 let a = [1,47,5,6,2,3,8,-7,-6,0,2,1];

 console.log(insertion_sort(a));