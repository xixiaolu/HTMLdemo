// 单间商品的数据
class UIGoods {
    constructor(g){
        this.data = g;
        this.chooes = 0; // 默认选中0个
    }
    // 获取单个总价
    getTotalPrice(){
        return this.data.price * this.chooes;
    }
    // 是否选中此商品
    isChoose(){
        return this.chooes > 0;
    }
    // 选择数量+1
    increase(){
        this.chooes++;
    }
    // 选择数量-1
    decrease(){
        if(this.chooes === 0){
            return;
        }
        this.chooes--;
    }

}
// 整个ui界面的数据
class UIData{
    constructor(){
        var uiGoods = [];
        for(let i = 0 ; i < goods.length; i++){
            var uig = new UIGoods(goods[i]);
            uiGoods.push(uig);
        }
        this.uiGoods = uiGoods; // 商品数据
        this.deliveryThreshold = 50; // 起送费
        this.deliveryPrice = 5; // 配送费
    }
    // 获取全部商品的总价
    getTotalPrice(){
        var num = 0;
        for(let i = 0 ; i < this.uiGoods.length; i++){
            num += this.uiGoods[i].getTotalPrice();
        }
        return num;
    }
    // 增加某件商品的数量
    increase(index){
        this.uiGoods[index].increase();
    }

    // 减少某件商品的数量
    decrease(index){
        this.uiGoods[index].decrease();
    }

    // 得到总共的选中数量
    getTotalChooseNumber(){
        var nums = 0;
        for(let i = 0 ; i < this.uiGoods.length ; i++){
            nums += this.uiGoods[i].chooes;
        }
        return nums;
    }
    // 是否有商品在购物车
    hasGoodsInCar(){
        return this.getTotalChooseNumber() > 0;
    }

    // 是否跨越配送标准
    isCrosesDeliveryThreshold(){
        return this.getTotalPrice() >= this.deliveryThreshold;
    }

    isChoose(index){
        return this.uiGoods[index].isChoose();
    }
}
 
// 整个界面
class UI{
    constructor(){
        this.uiData = new UIData();
        this.doms = {
            goodsContainer : document.querySelector('.goods-list'),
            deliveryPrice : document.querySelector('.delivery-price'),  // 配送费
            footerPay : document.querySelector('.footer-pay'), // 页脚的支付按钮
            totalPrice : document.querySelector('.footer-car-total'), // 页脚的总价
        }
        this.createHTML();
        this.updateFooter();
    }
    createHTML(){
        var html = '';
        for(let i = 0 ; i < this.uiData.uiGoods.length; i++){
            var g = this.uiData.uiGoods[i];
            html += `
                <div class="goods-item">
                    <img class="goods-pic" src="./logo.png" alt="">
                    <div class="goods-info">
                        <h2 class="goods-title">${g.data.title}</h2>
                        <p class="goods-desc">
                            ${g.data.desc}
                        </p>
                        <p class="goods-sell">
                            <span>月销 ${g.data.sellNumber}</span>
                            <span>好评率 ${g.data.favorRate}</span>
                        </p>
                        <div class="goods-confirm">
                            <p class="goods-price">
                                <span class="goods-price-unit"> ￥ </span>
                                <span class="goods-price-number">${g.data.price}</span> 
                            </p>
                            <p class="goods-btns">
                                <i class="iconfont i-jianhao">-</i>
                                <span>0</span>
                                <i class="iconfont i-jiahao">+</i>
                            </p>
                        </div>
                    </div>
                </div>
            `
        }

        this.doms.goodsContainer.innerHTML = html;
    }

    // 增加第几件商品
    increase(index){
        this.uiData.increase(index);
        this.updateGoodsItem(index);
        this.updateFooter();
    }
    // 减少第几件商品的数量
    decrease(index){
        this.uiData.decrease(index);
        this.updateGoodsItem(index);
        this.updateFooter();
    }


    // 更新某个商品元素的显示状态
    updateGoodsItem(index){
        let goodsDom = this.doms.goodsContainer.children[index];
        if(this.uiData.isChoose(index)){
            goodsDom.classList.add('active');
        } else {
            goodsDom.classList.remove('active');
        }
        var span = goodsDom.querySelector('.goods-btns span')
        span.textContent = this.uiData.uiGoods[index].chooes;
    }

    // 更新页脚
    updateFooter(){
        // 得到总价数据
        var total = this.uiData.getTotalPrice();
        total = Math.round(total);
        // 设置配送费
        this.doms.footerPay.textContent = `去结算(${this.uiData.getTotalChooseNumber()})￥${total}`;
        this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`
        // 判断是否到达起送费
        if(this.uiData.isCrosesDeliveryThreshold()){
            
        } else {
            var dis = this.uiData.deliveryThreshold - total;
            dis = Math.round(dis);
            this.doms.footerPay.textContent += `，还差￥${dis}起送`;
        }
        // 总价元素
        this.doms.totalPrice.textContent = `合计${total.toFixed(2)}`;
    }
}
var ui = new UI();
// console.log(ui)