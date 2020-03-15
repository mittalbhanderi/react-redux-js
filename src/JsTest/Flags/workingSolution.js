
function Solution(A) {
    let peaks = [];

    for (let i = 1; i < A.length - 1; i++) {
        if (A[i] > A[i - 1] && A[i] > A[i + 1]) {
            peaks.push(i);  
        }
    }

    let n = peaks.length;
    if (n <= 2) {
        return n;
    }

    let maxFlags = Math.min(n, Math.ceil(Math.sqrt(A.length)));
    let distance = maxFlags;
    let rightPeak = peaks[n - 1];

    for (let k = maxFlags - 2; k > 0; k--) {
        let flags = k;
        let leftPeak = peaks[0];

        for (let i = 1; i <= n - 2; i++) {
            if (peaks[i] - leftPeak >= distance && rightPeak - peaks[i] >= distance) {
                if (flags === 1) {
                    return k + 2;    
                }

                flags--;
                leftPeak = peaks[i];
            }

            if (rightPeak - peaks[i] <= flags * (distance + 1)) {
                break;
            }
        }

        if (flags === 0) {
            return k + 2;
        }

        distance--;
    }

    return 2;
}

let A = [1,3,5,6,4,8,5,2,3,5,6,4,2]

console.log(Solution(A));