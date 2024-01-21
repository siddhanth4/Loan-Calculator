let loanAmount = document.getElementById("amount");
        let interestRate = document.getElementById("interest");
        let loanDuration = document.getElementById("loanTenure");
        let submit = document.getElementById("calculate");
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            calculateEMI();
        })
        function calculateEMI() {
            let isYear = document.getElementById("year").checked;
            let isMonth = document.getElementById("month").checked;
            let noOfMonths = 0;         
            if (isYear == "" && isMonth == "") {
                alert("Please select loan tenure type-> Month or year");
            } else {
                if (isYear == true) {
                    noOfMonths = loanDuration.value * 12;
                } else {
                    noOfMonths = loanDuration.value;
                }
                let r = parseFloat(interestRate.value) / 12 / 100;
                let P = loanAmount.value;
                let n = noOfMonths;
                let EMI = (P * r * Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);
                let totalInterest = (EMI * n) - P;
                let totalPayment = totalInterest + parseFloat(P);
                document.getElementById("emi").innerText = "₹" + Math.round(EMI);
                document.getElementById("totalInterest").innerText = "₹" + Math.round(totalInterest);
                document.getElementById("totalPayment").innerText = "₹" + Math.round(totalPayment);               
                updatePieChart(loanAmount.value, interestRate.value, loanDuration.value);
            }
        }
        function updatePieChart(loanAmount, interestRate, loanDuration) {
            let pieData = [
                parseFloat(loanAmount),
                parseFloat(interestRate),
                parseFloat(loanDuration)
            ];          
            let loanTenureLabel = document.getElementById("year").checked ? 'Years' : 'Months';
            let pieLabels = ['Loan Amount', 'Interest Rate', `Loan Duration (${loanTenureLabel})`];            
            let ctx = document.getElementById('pieChart').getContext('2d');
            if (typeof myPieChart !== 'undefined') {
                myPieChart.destroy(); // Destroy the previous chart instance to prevent conflicts
            }
            myPieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: pieLabels,
                    datasets: [{
                        label: 'Loan Parameters',
                        data: pieData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }       