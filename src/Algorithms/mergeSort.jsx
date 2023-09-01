export const mergeSort = (allBars, speed) => {
    const delay = Math.abs(speed); // Delay in milliseconds
    

    var myArray = new Array(allBars.length);
    for (var i = 0; i < allBars.length; i++) {
        myArray[i] = allBars[i].style.height;
        myArray[i] = myArray[i].substring(0, myArray[i].length - 2);
    }




    async function changeColorsWithDelay(allBars, delay) {
        let i = allBars.length - 1;

        while (i >= 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));

            allBars[i].style.backgroundColor = 'green';

            if (allBars[i + 5]) {
                const tempHeight = allBars[i].style.height;
                allBars[i].style.height = allBars[i + 5].style.height;
                allBars[i + 5].style.height = tempHeight;
            }

            i--;
        }
    }

    // Usage:
    //  changeColorsWithDelay(allBars, delay);

  //  mergeSort(myArray, 0, allBars.length - 1);

    
    async function animateHeightChange(bar, newHeight, delay) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        bar.style.height = newHeight + "px";
    }

    async function mergeSort(arr, left, right) {
        if (left >= right) {
            return;
        }

        const middle = left + parseInt((right - left) / 2);

        await mergeSort(arr, left, middle);
        await mergeSort(arr, middle + 1, right);
        await merge(arr, left, middle, right);
    }


    async function merge(arr, left, middle, right) {
        const leftArrSize = middle - left + 1;
        const rightArrSize = right - middle;

        const leftTempArr = new Array(leftArrSize);
        const rightTempArr = new Array(rightArrSize);

        for (let i = 0; i < leftArrSize; i++) {
            leftTempArr[i] = arr[left + i];
        }
        for (let j = 0; j < rightArrSize; j++) {
            rightTempArr[j] = arr[middle + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = left;

        while (i < leftArrSize && j < rightArrSize) {
            if (parseInt(leftTempArr[i]) <= parseInt(rightTempArr[j])) {
                arr[k] = leftTempArr[i];
                await animateHeightChange(allBars[k], leftTempArr[i], delay);
                i++;
            } else {
                arr[k] = rightTempArr[j];
                await animateHeightChange(allBars[k], rightTempArr[j], delay);
                j++;
            }
            k++;
        }

        while (i < leftArrSize) {
            arr[k] = leftTempArr[i];
            await animateHeightChange(allBars[k], leftTempArr[i], delay);
            i++;
            k++;
        }

        while (j < rightArrSize) {
            arr[k] = rightTempArr[j];
            await animateHeightChange(allBars[k], rightTempArr[j], delay);
            j++;
            k++;
        }
    }

    function mergeSortPromise(arr, left, right) {
        return new Promise(async (resolve) => {
          await mergeSort(arr, left, right);
          resolve(arr);
        });
      }
      async function runMergeSort() {
        // Define allBars correctly here or pass it as a parameter
        // For example, const allBars = document.querySelectorAll(".bar");
        const delay = 50; // Adjust the delay value as needed
      
        const sortedArray = await mergeSortPromise(myArray.slice(), 0, myArray.length - 1);

        // mergeSort is done, now check if the arrays are the same
        const isSame = sameArr(myArray, sortedArray);
      
        console.log("Are the arrays the same after merge sort?", isSame);
        printArray(myArray, myArray.length);
        printArray(sortedArray, sortedArray.length);

      }
      
      // Example usage
      runMergeSort();
    // Call the function to start the process
   // mergeSort(myArray, 0, allBars.length - 1);
  

    // // left-> left index and right->right index
    // function mergeSort(arr, left, right) {
    //     if (left >= right) {
    //         return;
    //     }

    //     // calculate the middle value
    //     // take into account the odd values
    //     var middle = left + parseInt((right - left) / 2);

    //     mergeSort(arr, left, middle);
    //     mergeSort(arr, middle + 1, right);
    //     merge(arr, left, middle, right, delay);
    // }


    // async function merge(arr, left, middle, right, delay) {
    //     // get the sizes of the two sides
    //     var leftArrSize = middle - left + 1;
    //     var rightArrSize = right - middle;

    //     // create two temp arrays
    //     var leftTempArr = new Array(leftArrSize);
    //     var rightTempArr = new Array(rightArrSize);

    //     // copy the data to temp arrays
    //     for (var i = 0; i < leftArrSize; i++) {
    //         leftTempArr[i] = arr[left + i];
    //     }
    //     for (var j = 0; j < rightArrSize; j++) {
    //         rightTempArr[j] = arr[middle + 1 + j];
    //     }

    //     //index of left sub array
    //     var i = 0;

    //     //index of right sub array
    //     var j = 0;

    //     //index of merged array
    //     var k = left;

    //     // merge the temp arrays into original arr
    //     while (i < leftArrSize && j < rightArrSize) {
    //         await new Promise((resolve) => setTimeout(resolve, delay));
    //         if (parseInt(leftTempArr[i]) <= parseInt(rightTempArr[j])) {
    //             // setTimeout(() => {
    //             //     if (k < allBars.length) {
    //             //         allBars[k].style.backgroundColor = 'red';
    //             //         allBars[k].style.height = leftTempArr[i] + "px";
    //             //     }
    //             // }, delay * 4);
    //             allBars[k].style.height = leftTempArr[i] + "px";
    //             arr[k] = leftTempArr[i];
    //             i++;
    //         }
    //         else {
    //             // setTimeout(() => {
    //             //     if (k < allBars.length) {
    //             //         allBars[k].style.backgroundColor = 'red';
    //             //         allBars[k].style.height = rightTempArr[i] + "px";
    //             //     }
    //             // }, delay * 4);
    //             allBars[k].style.height = rightTempArr[j] + "px";
    //             arr[k] = rightTempArr[j];
    //             j++;
    //         }
    //         k++;
    //     }

    //     //take care of the remaining elements if any on left side
    //     while (i < leftArrSize) {
    //         await new Promise((resolve) => setTimeout(resolve, delay));
    //         allBars[k].style.height = leftTempArr[i] + "px";
    //         arr[k] = leftTempArr[i];
    //         i++;
    //         k++;
    //     }
    //     //take care of the remaining elements if any on right side
    //     while (j < rightArrSize) {
    //         await new Promise((resolve) => setTimeout(resolve, delay));
    //         allBars[k].style.height = rightTempArr[j] + "px";
    //         arr[k] = rightTempArr[j];
    //         j++;
    //         k++;
    //     }
    // }



    // Function to print an array
    function printArray(A, size) {
        for (var i = 0; i < size; i++)
            console.log(A[i] + " ");
    }

    function sameArr(A1, A2) {
        // if(A1.length != A2.length)
        // {
        //     return false;
        // }
        for (var i = 0; i < A1.length; i++) {
            if (A1[i] != A2[i]) {
                return false;
            }
        }
        return true;
    }

    // for (var i = 0; i < allBars.length; i++) {
    //     allBars[i].style.height = myArray[i] + "px";
    // }


};