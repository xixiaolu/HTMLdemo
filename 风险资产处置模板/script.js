// 模拟从后端获取的数据
const loanData = {
    applyDate: '2025-09-09',
    contractNo: '0166020026',
    productName: '一般小本贷款(个人)',
    loanAmount: '66000.00',
    loanStartDate: '2025-09-03',
    operator: '泷茵售',
    description: '请在下方债务人情况说明列表操作按钮处填报客户基本信息。',
    serialNo: '',
    customerNo: '1000000030',
    guaranteeType: '信用',
    loanBalance: '1000.00',
    loanEndDate: '2026-09-03',
    operatorOrg: '集团',
    disposalNo: '',
    customerName: '祁小桃',
    riskCategory: '正常',
    interestRate: '11.22',
    collectionMethod: ''
};
const borrowerData = [
    { customerNo: '1000000030', customerName: '祁小桃' }
];
// 页面加载完成后执行
window.onload = function () {
    // 回显贷款信息
    document.getElementById('applyDate').value = loanData.applyDate;
    document.getElementById('contractNo').value = loanData.contractNo;
    document.getElementById('productName').value = loanData.productName;
    document.getElementById('loanAmount').value = loanData.loanAmount;
    document.getElementById('loanStartDate').value = loanData.loanStartDate;
    document.getElementById('operator').value = loanData.operator;
    document.getElementById('description').value = loanData.description;
    document.getElementById('serialNo').value = loanData.serialNo;
    document.getElementById('customerNo').value = loanData.customerNo;
    document.getElementById('guaranteeType').value = loanData.guaranteeType;
    document.getElementById('loanBalance').value = loanData.loanBalance;
    document.getElementById('loanEndDate').value = loanData.loanEndDate;
    document.getElementById('operatorOrg').value = loanData.operatorOrg;
    document.getElementById('disposalNo').value = loanData.disposalNo;
    document.getElementById('customerName').value = loanData.customerName;
    document.getElementById('riskCategory').value = loanData.riskCategory;
    document.getElementById('interestRate').value = loanData.interestRate;
    document.getElementById('collectionMethod').value = loanData.collectionMethod;
    // 回显借款人列表
    const borrowerTableBody = document.querySelector('#borrowerTable tbody');
    borrowerData.forEach(borrower => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${borrower.customerNo}</td>
            <td>${borrower.customerName}</td>
            <td><button class="edit-btn">编辑</button></td>
        `;
        borrowerTableBody.appendChild(row);
    });
    // 浏览按钮点击事件（示例）
    document.getElementById('browseBtn').addEventListener('click', function () {
        alert('浏览按钮点击，可在此处添加文件浏览逻辑');
    });
    // 新增按钮点击事件（示例）
    document.getElementById('addBtn').addEventListener('click', function () {
        alert('新增按钮点击，可在此处添加新增共同借款人逻辑');
    });
};