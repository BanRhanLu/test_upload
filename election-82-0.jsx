import React, { useState, useEffect, useMemo } from "react";

const DATA = {"cands":[{"y":1989,"n":"陳進砲","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.85%","w":0},{"y":1989,"n":"王精明","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.53%","w":0},{"y":1989,"n":"卓定俊","p":"中國復興黨","t":"新北市","r":"台北縣","pct":"0.53%","w":0},{"y":1989,"n":"李錫錕","p":"國民黨","t":"新北市","r":"台北縣","pct":"48.45%","w":0},{"y":1989,"n":"李華京","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.88%","w":0},{"y":1989,"n":"尤清","p":"民進黨","t":"新北市","r":"台北縣","pct":"48.76%","w":1},{"y":1989,"n":"楊良茂","p":"無黨籍","t":"桃園市","r":"桃園縣","pct":"3.8%","w":0},{"y":1989,"n":"曾宗振","p":"無黨籍","t":"桃園市","r":"桃園縣","pct":"1.45%","w":0},{"y":1989,"n":"張貴木","p":"民進黨","t":"桃園市","r":"桃園縣","pct":"41.28%","w":0},{"y":1989,"n":"劉邦友","p":"國民黨","t":"桃園市","r":"桃園縣","pct":"53.47%","w":1},{"y":1989,"n":"范振宗","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"51.08%","w":1},{"y":1989,"n":"傅忠雄","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"48.92%","w":0},{"y":1989,"n":"施性融","p":"民進黨","t":"新竹市","r":"新竹市","pct":"31.76%","w":0},{"y":1989,"n":"莊姬美","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"9.44%","w":0},{"y":1989,"n":"林聖崇","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"2.20%","w":0},{"y":1989,"n":"童勝男","p":"國民黨","t":"新竹市","r":"新竹市","pct":"56.60%","w":1},{"y":1989,"n":"張榮顯","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"29.03%","w":0},{"y":1989,"n":"張秋華","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"44.54%","w":1},{"y":1989,"n":"陳秀龍","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"26.43%","w":0},{"y":1989,"n":"楊嘉猷","p":"民進黨","t":"台中市","r":"台中縣","pct":"40.31%","w":0},{"y":1989,"n":"廖了以","p":"國民黨","t":"台中市","r":"台中縣","pct":"59.69%","w":1},{"y":1989,"n":"許榮淑","p":"民進黨","t":"台中市","r":"台中市","pct":"38.81%","w":0},{"y":1989,"n":"林柏榕","p":"國民黨","t":"台中市","r":"台中市","pct":"61.19%","w":1},{"y":1993,"n":"石瓊文","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.54%","w":0},{"y":1993,"n":"尤清","p":"民進黨","t":"新北市","r":"台北縣","pct":"46.38%","w":1},{"y":1993,"n":"李勝峰","p":"新黨","t":"新北市","r":"台北縣","pct":"16.32%","w":0},{"y":1993,"n":"蔡勝邦","p":"國民黨","t":"新北市","r":"台北縣","pct":"35.97%","w":0},{"y":1993,"n":"張馥堂","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.79%","w":0},{"y":1993,"n":"黃玉嬌","p":"無黨籍","t":"桃園市","r":"桃園縣","pct":"2.67%","w":0},{"y":1993,"n":"黃木添","p":"無黨籍","t":"桃園市","r":"桃園縣","pct":"21.74%","w":0},{"y":1993,"n":"張勝勛","p":"民進黨","t":"桃園市","r":"桃園縣","pct":"36.27%","w":0},{"y":1993,"n":"劉邦友","p":"國民黨","t":"桃園市","r":"桃園縣","pct":"39.32%","w":1},{"y":1993,"n":"周細滿","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"6.71%","w":0},{"y":1993,"n":"范振宗","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"50.04%","w":1},{"y":1993,"n":"鄭永金","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"43.25%","w":0},{"y":1993,"n":"童勝男","p":"國民黨","t":"新竹市","r":"新竹市","pct":"55.13%","w":1},{"y":1993,"n":"吳秋穀","p":"民進黨","t":"新竹市","r":"新竹市","pct":"26.88%","w":0},{"y":1993,"n":"謝啟大","p":"新黨","t":"新竹市","r":"新竹市","pct":"10.06%","w":0},{"y":1993,"n":"任富勇","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"7.93%","w":0},{"y":1993,"n":"張秋華","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"33.58%","w":0},{"y":1993,"n":"何智輝","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"38.25%","w":1},{"y":1993,"n":"黎明光","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"0.73%","w":0},{"y":1993,"n":"葉英秀","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"1.56%","w":0},{"y":1993,"n":"黃瑞明","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"0.49%","w":0},{"y":1993,"n":"傅文政","p":"民進黨","t":"苗栗縣","r":"苗栗縣","pct":"25.40%","w":0},{"y":1993,"n":"楊嘉猷","p":"民進黨","t":"台中市","r":"台中縣","pct":"41.11%","w":0},{"y":1993,"n":"廖了以","p":"國民黨","t":"台中市","r":"台中縣","pct":"58.89%","w":1},{"y":1993,"n":"林俊義","p":"民進黨","t":"台中市","r":"台中市","pct":"41.87%","w":0},{"y":1993,"n":"林柏榕","p":"國民黨","t":"台中市","r":"台中市","pct":"58.13%","w":1},{"y":1994,"n":"紀榮治","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.28%","w":0},{"y":1994,"n":"趙少康","p":"新黨","t":"台北市","r":"台北市","pct":"30.17%","w":0},{"y":1994,"n":"陳水扁","p":"民進黨","t":"台北市","r":"台北市","pct":"43.67%","w":1},{"y":1994,"n":"黃大洲","p":"國民黨","t":"台北市","r":"台北市","pct":"25.89%","w":0},{"y":1994,"n":"投票率","p":"投票率","t":"台北市","r":"台北市","pct":"78.53%","w":0},{"y":1997,"n":"謝深山","p":"國民黨","t":"新北市","r":"台北縣","pct":"38.67%","w":0},{"y":1997,"n":"周荃","p":"無黨籍","t":"新北市","r":"台北縣","pct":"2.30%","w":0},{"y":1997,"n":"楊泰順","p":"新黨","t":"新北市","r":"台北縣","pct":"2.34%","w":0},{"y":1997,"n":"林志嘉","p":"無黨籍","t":"新北市","r":"台北縣","pct":"11.00%","w":0},{"y":1997,"n":"蘇貞昌","p":"民進黨","t":"新北市","r":"台北縣","pct":"40.67%","w":1},{"y":1997,"n":"廖學廣","p":"無黨籍","t":"新北市","r":"台北縣","pct":"5.02%","w":0},{"y":1997,"n":"呂秀蓮","p":"民進黨","t":"桃園市","r":"桃園縣","pct":"56.20%","w":1},{"y":1997,"n":"陳根德","p":"國民黨","t":"桃園市","r":"桃園縣","pct":"42.96%","w":0},{"y":1997,"n":"徐運德","p":"社會改革黨","t":"桃園市","r":"桃園縣","pct":"0.84%","w":0},{"y":1997,"n":"徐能安","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"0.73%","w":0},{"y":1997,"n":"邱鏡淳","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"30.26%","w":0},{"y":1997,"n":"鄭永金","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"32.89%","w":0},{"y":1997,"n":"林光華","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"36.12%","w":1},{"y":1997,"n":"林志成","p":"國民黨","t":"新竹市","r":"新竹市","pct":"42.79%","w":0},{"y":1997,"n":"蔡仁堅","p":"民進黨","t":"新竹市","r":"新竹市","pct":"56.11%","w":1},{"y":1997,"n":"王少泉","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"1.10%","w":0},{"y":1997,"n":"傅學鵬","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"54.80%","w":1},{"y":1997,"n":"何智輝","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"35.37%","w":0},{"y":1997,"n":"黃達業","p":"新黨","t":"苗栗縣","r":"苗栗縣","pct":"5.66%","w":0},{"y":1997,"n":"徐進榮","p":"民進黨","t":"苗栗縣","r":"苗栗縣","pct":"4.17%","w":0},{"y":1997,"n":"錢文南","p":"建國黨","t":"台中市","r":"台中縣","pct":"1.00%","w":0},{"y":1997,"n":"陳欽隆","p":"無黨籍","t":"台中市","r":"台中縣","pct":"1.82%","w":0},{"y":1997,"n":"郭榮振","p":"國民黨","t":"台中市","r":"台中縣","pct":"29.26%","w":0},{"y":1997,"n":"徐中雄","p":"國民黨","t":"台中市","r":"台中縣","pct":"24.33%","w":0},{"y":1997,"n":"劉銓忠","p":"無黨籍","t":"台中市","r":"台中縣","pct":"5.99%","w":0},{"y":1997,"n":"廖永來","p":"民進黨","t":"台中市","r":"台中縣","pct":"37.60%","w":1},{"y":1997,"n":"張溫鷹","p":"民進黨","t":"台中市","r":"台中市","pct":"49.57%","w":1},{"y":1997,"n":"鄭邦鎮","p":"建國黨","t":"台中市","r":"台中市","pct":"1.83%","w":0},{"y":1997,"n":"洪昭男","p":"國民黨","t":"台中市","r":"台中市","pct":"41.28%","w":0},{"y":1997,"n":"宋艾克","p":"新黨","t":"台中市","r":"台中市","pct":"7.32%","w":0},{"y":1998,"n":"馬英九","p":"國民黨","t":"台北市","r":"台北市","pct":"51.13%","w":1},{"y":1998,"n":"陳水扁","p":"民進黨","t":"台北市","r":"台北市","pct":"45.91%","w":0},{"y":1998,"n":"王建煊","p":"新黨","t":"台北市","r":"台北市","pct":"2.97%","w":0},{"y":2001,"n":"王建煊","p":"新黨","t":"新北市","r":"台北縣","pct":"48.16%","w":0},{"y":2001,"n":"邵建興","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.23%","w":0},{"y":2001,"n":"石翊靖","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.29%","w":0},{"y":2001,"n":"蘇貞昌","p":"民進黨","t":"新北市","r":"台北縣","pct":"51.31%","w":1},{"y":2001,"n":"投票率","p":"投票率","t":"新北市","r":"台北縣","pct":"68.07%","w":0},{"y":2001,"n":"彭紹瑾","p":"民進黨","t":"桃園市","r":"桃園縣","pct":"44.20%","w":0},{"y":2001,"n":"朱立倫","p":"國民黨","t":"桃園市","r":"桃園縣","pct":"55.24%","w":1},{"y":2001,"n":"莊志忠","p":"無黨籍","t":"桃園市","r":"桃園縣","pct":"0.56%","w":0},{"y":2001,"n":"投票率","p":"投票率","t":"桃園市","r":"桃園縣","pct":"68.32%","w":0},{"y":2001,"n":"林光華","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"46.39%","w":0},{"y":2001,"n":"鄭永金","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"53.61%","w":1},{"y":2001,"n":"投票率","p":"投票率","t":"新竹縣","r":"新竹縣","pct":"70.38%","w":0},{"y":2001,"n":"蔡仁堅","p":"民進黨","t":"新竹市","r":"新竹市","pct":"42.77%","w":0},{"y":2001,"n":"王少泉","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.50%","w":0},{"y":2001,"n":"林政則","p":"國民黨","t":"新竹市","r":"新竹市","pct":"56.01%","w":1},{"y":2001,"n":"黃中媄","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.72%","w":0},{"y":2001,"n":"投票率","p":"投票率","t":"新竹市","r":"新竹市","pct":"63.91%","w":0},{"y":2001,"n":"魏早炳","p":"民進黨","t":"苗栗縣","r":"苗栗縣","pct":"23.55%","w":0},{"y":2001,"n":"傅學鵬","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"51.80%","w":1},{"y":2001,"n":"李佳穆","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"0.77%","w":0},{"y":2001,"n":"徐享崑","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"23.88%","w":0},{"y":2001,"n":"投票率","p":"投票率","t":"苗栗縣","r":"苗栗縣","pct":"67.25%","w":0},{"y":2001,"n":"林敏霖","p":"無黨籍","t":"台中市","r":"台中縣","pct":"9.49%","w":0},{"y":2001,"n":"黃仲生","p":"國民黨","t":"台中市","r":"台中縣","pct":"49.48%","w":1},{"y":2001,"n":"廖永來","p":"民進黨","t":"台中市","r":"台中縣","pct":"41.02%","w":0},{"y":2001,"n":"投票率","p":"投票率","t":"台中市","r":"台中縣","pct":"66.27%","w":0},{"y":2001,"n":"張溫鷹","p":"無黨籍","t":"台中市","r":"台中市","pct":"10.18%","w":0},{"y":2001,"n":"蔡明憲","p":"民進黨","t":"台中市","r":"台中市","pct":"40.74%","w":0},{"y":2001,"n":"胡志強","p":"國民黨","t":"台中市","r":"台中市","pct":"49.08%","w":1},{"y":2002,"n":"李應元","p":"民進黨","t":"台北市","r":"台北市","pct":"35.89%","w":0},{"y":2002,"n":"馬英九","p":"國民黨","t":"台北市","r":"台北市","pct":"64.11%","w":1},{"y":2002,"n":"投票率","p":"投票率","t":"台北市","r":"台北市","pct":"70.61%","w":0},{"y":2005,"n":"黃福卿","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.31%","w":0},{"y":2005,"n":"周錫瑋","p":"國民黨","t":"新北市","r":"台北縣","pct":"54.87%","w":1},{"y":2005,"n":"陳誠鈞","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.16%","w":0},{"y":2005,"n":"陳俊傑","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.23%","w":0},{"y":2005,"n":"羅文嘉","p":"民進黨","t":"新北市","r":"台北縣","pct":"44.30%","w":0},{"y":2005,"n":"黃茂全","p":"無黨籍","t":"新北市","r":"台北縣","pct":"0.14%","w":0},{"y":2005,"n":"投票率","p":"投票率","t":"新北市","r":"台北縣","pct":"66.35%","w":0},{"y":2005,"n":"朱立倫","p":"國民黨","t":"桃園市","r":"桃園縣","pct":"60.84%","w":1},{"y":2005,"n":"鄭寶清","p":"民進黨","t":"桃園市","r":"桃園縣","pct":"38.32%","w":0},{"y":2005,"n":"吳家登","p":"無黨籍","t":"桃園市","r":"桃園縣","pct":"0.84%","w":0},{"y":2005,"n":"投票率","p":"投票率","t":"桃園市","r":"桃園縣","pct":"61.77%","w":0},{"y":2005,"n":"林光華","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"32.91%","w":0},{"y":2005,"n":"鄭永金","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"67.09%","w":1},{"y":2005,"n":"投票率","p":"投票率","t":"新竹縣","r":"新竹縣","pct":"71.12%","w":0},{"y":2005,"n":"鄭貴元","p":"民進黨","t":"新竹市","r":"新竹市","pct":"30.73%","w":0},{"y":2005,"n":"林政則","p":"國民黨","t":"新竹市","r":"新竹市","pct":"69.27%","w":1},{"y":2005,"n":"投票率","p":"投票率","t":"新竹市","r":"新竹市","pct":"59.60%","w":0},{"y":2005,"n":"顏培元","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"1.09%","w":0},{"y":2005,"n":"陳秀龍","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"3.47%","w":0},{"y":2005,"n":"劉政鴻","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"47.91%","w":1},{"y":2005,"n":"邱炳坤","p":"民進黨","t":"苗栗縣","r":"苗栗縣","pct":"29.86%","w":0},{"y":2005,"n":"徐耀昌","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"17.07%","w":0},{"y":2005,"n":"江炳輝","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"0.61%","w":0},{"y":2005,"n":"投票率","p":"投票率","t":"苗栗縣","r":"苗栗縣","pct":"69.45%","w":0},{"y":2005,"n":"邱太三","p":"民進黨","t":"台中市","r":"台中縣","pct":"39.12%","w":0},{"y":2005,"n":"黃仲生","p":"國民黨","t":"台中市","r":"台中縣","pct":"59.45%","w":1},{"y":2005,"n":"林振昌","p":"無黨籍","t":"台中市","r":"台中縣","pct":"1.44%","w":0},{"y":2005,"n":"投票率","p":"投票率","t":"台中市","r":"台中縣","pct":"65.78%","w":0},{"y":2005,"n":"李貴富","p":"無黨籍","t":"台中市","r":"台中市","pct":"0.42%","w":0},{"y":2005,"n":"沈智慧","p":"親民黨","t":"台中市","r":"台中市","pct":"2.23%","w":0},{"y":2005,"n":"林佳龍","p":"民進黨","t":"台中市","r":"台中市","pct":"39.00%","w":0},{"y":2005,"n":"胡志強","p":"國民黨","t":"台中市","r":"台中市","pct":"58.34%","w":1},{"y":2006,"n":"李敖","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.61%","w":0},{"y":2006,"n":"周玉蔻","p":"台聯黨","t":"台北市","r":"台北市","pct":"0.26%","w":0},{"y":2006,"n":"謝長廷","p":"民進黨","t":"台北市","r":"台北市","pct":"40.89%","w":0},{"y":2006,"n":"宋楚瑜","p":"無黨籍","t":"台北市","r":"台北市","pct":"4.14%","w":0},{"y":2006,"n":"郝龍斌","p":"國民黨","t":"台北市","r":"台北市","pct":"53.81%","w":1},{"y":2006,"n":"柯賜海","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.29%","w":0},{"y":2009,"n":"吳富彤","p":"客家黨","t":"桃園市","r":"桃園縣","pct":"2.08%","w":0},{"y":2009,"n":"鄭文燦","p":"民進黨","t":"桃園市","r":"桃園縣","pct":"45.69%","w":0},{"y":2009,"n":"吳志揚","p":"國民黨","t":"桃園市","r":"桃園縣","pct":"52.22%","w":1},{"y":2009,"n":"投票率","p":"投票率","t":"桃園市","r":"桃園縣","pct":"53.73%","w":0},{"y":2009,"n":"邱鏡淳","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"38.49%","w":1},{"y":2009,"n":"張碧琴","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"30.21%","w":0},{"y":2009,"n":"彭紹瑾","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"30.55%","w":0},{"y":2009,"n":"曾錦祥","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"0.75%","w":0},{"y":2009,"n":"投票率","p":"投票率","t":"新竹縣","r":"新竹縣","pct":"69.49%","w":0},{"y":2009,"n":"許明財","p":"國民黨","t":"新竹市","r":"新竹市","pct":"55.63%","w":1},{"y":2009,"n":"林修二","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"3.05%","w":0},{"y":2009,"n":"劉俊秀","p":"民進黨","t":"新竹市","r":"新竹市","pct":"41.32%","w":0},{"y":2009,"n":"投票率","p":"投票率","t":"新竹市","r":"新竹市","pct":"56.83%","w":0},{"y":2009,"n":"楊長鎮","p":"民進黨","t":"苗栗縣","r":"苗栗縣","pct":"33.60%","w":0},{"y":2009,"n":"劉政鴻","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"63.79%","w":1},{"y":2009,"n":"李佳穆","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"2.61%","w":0},{"y":2009,"n":"投票率","p":"投票率","t":"苗栗縣","r":"苗栗縣","pct":"68.28%","w":0},{"y":2010,"n":"吳炎成","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.13%","w":0},{"y":2010,"n":"郝龍斌","p":"國民黨","t":"台北市","r":"台北市","pct":"55.65%","w":1},{"y":2010,"n":"蕭淑華","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.16%","w":0},{"y":2010,"n":"吳武明","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.26%","w":0},{"y":2010,"n":"蘇貞昌","p":"民進黨","t":"台北市","r":"台北市","pct":"43.81%","w":0},{"y":2010,"n":"朱立倫","p":"國民黨","t":"新北市","r":"新北市","pct":"52.61%","w":1},{"y":2010,"n":"蔡英文","p":"民進黨","t":"新北市","r":"新北市","pct":"47.39%","w":0},{"y":2010,"n":"蘇嘉全","p":"民進黨","t":"台中市","r":"台中市","pct":"48.88%","w":0},{"y":2010,"n":"胡志強","p":"國民黨","t":"台中市","r":"台中市","pct":"51.12%","w":1},{"y":2014,"n":"陳汝斌","p":"三等國民公義人權自救黨","t":"台北市","r":"台北市","pct":"0.11%","w":0},{"y":2014,"n":"趙衍慶","p":"無黨籍","t":"台北市","r":"台北市","pct":"1.06%","w":0},{"y":2014,"n":"李宏信","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.18%","w":0},{"y":2014,"n":"陳永昌","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.13%","w":0},{"y":2014,"n":"馮光遠","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.54%","w":0},{"y":2014,"n":"連勝文","p":"國民黨","t":"台北市","r":"台北市","pct":"40.82%","w":0},{"y":2014,"n":"柯文哲","p":"無黨籍","t":"台北市","r":"台北市","pct":"57.16%","w":1},{"y":2014,"n":"游錫堃","p":"民進黨","t":"新北市","r":"新北市","pct":"48.78%","w":0},{"y":2014,"n":"李進順","p":"無黨籍","t":"新北市","r":"新北市","pct":"1.16%","w":0},{"y":2014,"n":"朱立倫","p":"國民黨","t":"新北市","r":"新北市","pct":"50.06%","w":1},{"y":2014,"n":"鄭文燦","p":"民進黨","t":"桃園市","r":"桃園市","pct":"51.00%","w":1},{"y":2014,"n":"吳志揚","p":"國民黨","t":"桃園市","r":"桃園市","pct":"47.97%","w":0},{"y":2014,"n":"許睿智","p":"無黨籍","t":"桃園市","r":"桃園市","pct":"1.03%","w":0},{"y":2014,"n":"胡志強","p":"國民黨","t":"台中市","r":"台中市","pct":"42.94%","w":0},{"y":2014,"n":"林佳龍","p":"民進黨","t":"台中市","r":"台中市","pct":"57.06%","w":1},{"y":2014,"n":"葉芳棟","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"5.93%","w":0},{"y":2014,"n":"邱鏡淳","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"46.94%","w":1},{"y":2014,"n":"鄭永金","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"44.82%","w":0},{"y":2014,"n":"莊作兵","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"2.31%","w":0},{"y":2014,"n":"劉正幸","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.96%","w":0},{"y":2014,"n":"許明財","p":"國民黨","t":"新竹市","r":"新竹市","pct":"37.85%","w":0},{"y":2014,"n":"蔡仁堅","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"20.28%","w":0},{"y":2014,"n":"林智堅","p":"民進黨","t":"新竹市","r":"新竹市","pct":"38.36%","w":1},{"y":2014,"n":"吳淑敏","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"2.56%","w":0},{"y":2014,"n":"徐耀昌","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"46.59%","w":1},{"y":2014,"n":"康世儒","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"19.06%","w":0},{"y":2014,"n":"江明修","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"4.73%","w":0},{"y":2014,"n":"陳淑芬","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"0.67%","w":0},{"y":2014,"n":"曾國良","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"0.57%","w":0},{"y":2014,"n":"吳宜臻","p":"民進黨","t":"苗栗縣","r":"苗栗縣","pct":"28.37%","w":0},{"y":2018,"n":"吳蕚洋","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.40%","w":0},{"y":2018,"n":"丁守中","p":"國民黨","t":"台北市","r":"台北市","pct":"40.82%","w":0},{"y":2018,"n":"姚文智","p":"民進黨","t":"台北市","r":"台北市","pct":"17.28%","w":0},{"y":2018,"n":"柯文哲","p":"無黨籍","t":"台北市","r":"台北市","pct":"41.07%","w":1},{"y":2018,"n":"李錫錕","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.44%","w":0},{"y":2018,"n":"蘇貞昌","p":"民進黨","t":"新北市","r":"新北市","pct":"42.85%","w":0},{"y":2018,"n":"侯友宜","p":"國民黨","t":"新北市","r":"新北市","pct":"57.15%","w":1},{"y":2018,"n":"朱梅雪","p":"無黨籍","t":"桃園市","r":"桃園市","pct":"1.76%","w":0},{"y":2018,"n":"陳學聖","p":"國民黨","t":"桃園市","r":"桃園市","pct":"39.42%","w":0},{"y":2018,"n":"楊麗環","p":"無黨籍","t":"桃園市","r":"桃園市","pct":"4.99%","w":0},{"y":2018,"n":"吳富彤","p":"無黨籍","t":"桃園市","r":"桃園市","pct":"0.37%","w":0},{"y":2018,"n":"鄭文燦","p":"民進黨","t":"桃園市","r":"桃園市","pct":"53.46%","w":1},{"y":2018,"n":"宋原通","p":"無黨籍","t":"台中市","r":"台中市","pct":"1.09%","w":0},{"y":2018,"n":"林佳龍","p":"民進黨","t":"台中市","r":"台中市","pct":"42.35%","w":0},{"y":2018,"n":"盧秀燕","p":"國民黨","t":"台中市","r":"台中市","pct":"56.57%","w":1},{"y":2018,"n":"楊文科","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"38.20%","w":1},{"y":2018,"n":"葉芳棟","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"1.83%","w":0},{"y":2018,"n":"鄭朝方","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"27.68%","w":0},{"y":2018,"n":"徐欣瑩","p":"民國黨","t":"新竹縣","r":"新竹縣","pct":"32.29%","w":0},{"y":2018,"n":"謝文進","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"20.31%","w":0},{"y":2018,"n":"李驥羣","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.32%","w":0},{"y":2018,"n":"黃源甫","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"1.66%","w":0},{"y":2018,"n":"許明財","p":"國民黨","t":"新竹市","r":"新竹市","pct":"27.87%","w":0},{"y":2018,"n":"郭榮睿","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.26%","w":0},{"y":2018,"n":"林智堅","p":"民進黨","t":"新竹市","r":"新竹市","pct":"49.57%","w":1},{"y":2018,"n":"朱泰平","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"2.26%","w":0},{"y":2018,"n":"徐定禎","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"37.03%","w":0},{"y":2018,"n":"黃玉燕","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"2.97%","w":0},{"y":2018,"n":"徐耀昌","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"57.74%","w":1},{"y":2022,"n":"張家豪","p":"台灣動物保護黨","t":"台北市","r":"台北市","pct":"0.17%","w":0},{"y":2022,"n":"王文娟","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.03%","w":0},{"y":2022,"n":"鄭匡宇","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.03%","w":0},{"y":2022,"n":"黃聖峰","p":"建國黨","t":"台北市","r":"台北市","pct":"0.02%","w":0},{"y":2022,"n":"童文薰","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.18%","w":0},{"y":2022,"n":"蔣萬安","p":"國民黨","t":"台北市","r":"台北市","pct":"42.29%","w":1},{"y":2022,"n":"蘇煥智","p":"台灣維新","t":"台北市","r":"台北市","pct":"0.14%","w":0},{"y":2022,"n":"黃珊珊","p":"無黨籍","t":"台北市","r":"台北市","pct":"25.14%","w":0},{"y":2022,"n":"施奉先","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.03%","w":0},{"y":2022,"n":"唐新民","p":"共和黨","t":"台北市","r":"台北市","pct":"0.02%","w":0},{"y":2022,"n":"謝立康","p":"無黨籍","t":"台北市","r":"台北市","pct":"0.02%","w":0},{"y":2022,"n":"陳時中","p":"民進黨","t":"台北市","r":"台北市","pct":"31.93%","w":0},{"y":2022,"n":"投票率","p":"投票率","t":"台北市","r":"台北市","pct":"67.70%","w":0},{"y":2022,"n":"林佳龍","p":"民進黨","t":"新北市","r":"新北市","pct":"37.58%","w":0},{"y":2022,"n":"侯友宜","p":"國民黨","t":"新北市","r":"新北市","pct":"62.42%","w":1},{"y":2022,"n":"投票率","p":"投票率","t":"新北市","r":"新北市","pct":"56.60%","w":0},{"y":2022,"n":"張善政","p":"國民黨","t":"桃園市","r":"桃園市","pct":"52.02%","w":1},{"y":2022,"n":"賴香伶","p":"民眾黨","t":"桃園市","r":"桃園市","pct":"5.12%","w":0},{"y":2022,"n":"鄭運鵬","p":"民進黨","t":"桃園市","r":"桃園市","pct":"40.03%","w":0},{"y":2022,"n":"鄭寶清","p":"無黨籍","t":"桃園市","r":"桃園市","pct":"2.83%","w":0},{"y":2022,"n":"投票率","p":"投票率","t":"桃園市","r":"桃園市","pct":"59.46%","w":0},{"y":2022,"n":"陳美妃","p":"無黨籍","t":"台中市","r":"台中市","pct":"1.72%","w":0},{"y":2022,"n":"蔡其昌","p":"民進黨","t":"台中市","r":"台中市","pct":"38.93%","w":0},{"y":2022,"n":"盧秀燕","p":"國民黨","t":"台中市","r":"台中市","pct":"59.35%","w":1},{"y":2022,"n":"投票率","p":"投票率","t":"台中市","r":"台中市","pct":"60.01%","w":0},{"y":2022,"n":"黃秀龍","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"1.32%","w":0},{"y":2022,"n":"范振揆","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"1.89%","w":0},{"y":2022,"n":"周江杰","p":"民進黨","t":"新竹縣","r":"新竹縣","pct":"32.40%","w":0},{"y":2022,"n":"楊文科","p":"國民黨","t":"新竹縣","r":"新竹縣","pct":"63.36%","w":1},{"y":2022,"n":"劉復嵐","p":"無黨籍","t":"新竹縣","r":"新竹縣","pct":"1.04%","w":0},{"y":2022,"n":"投票率","p":"投票率","t":"新竹縣","r":"新竹縣","pct":"58.98%","w":0},{"y":2022,"n":"黃源甫","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.48%","w":0},{"y":2022,"n":"龔偉綸","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.23%","w":0},{"y":2022,"n":"林耕仁","p":"國民黨","t":"新竹市","r":"新竹市","pct":"18.07%","w":0},{"y":2022,"n":"李驥羣","p":"無黨籍","t":"新竹市","r":"新竹市","pct":"0.51%","w":0},{"y":2022,"n":"沈慧虹","p":"民進黨","t":"新竹市","r":"新竹市","pct":"35.68%","w":0},{"y":2022,"n":"高虹安","p":"民眾黨","t":"新竹市","r":"新竹市","pct":"45.02%","w":1},{"y":2022,"n":"投票率","p":"投票率","t":"新竹市","r":"新竹市","pct":"62.94%","w":0},{"y":2022,"n":"鍾東錦","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"42.66%","w":1},{"y":2022,"n":"謝福弘","p":"國民黨","t":"苗栗縣","r":"苗栗縣","pct":"10.96%","w":0},{"y":2022,"n":"吳盛聖","p":"無黨籍","t":"苗栗縣","r":"苗栗縣","pct":"1.67%","w":0},{"y":2022,"n":"徐定禎","p":"民進黨","t":"苗栗縣","r":"苗栗縣","pct":"31.24%","w":0},{"y":2022,"n":"宋國鼎","p":"時代力量","t":"苗栗縣","r":"苗栗縣","pct":"13.47%","w":0},{"y":2022,"n":"投票率","p":"投票率","t":"苗栗縣","r":"苗栗縣","pct":"67.20%","w":0}],"prez":{"1996":{"台北市":{"win":"李登輝","c":{"陳履安":11.9,"李登輝":38.9,"彭明敏":24.3,"林洋港":24.9}},"新北市":{"win":"李登輝","c":{"陳履安":11.4,"李登輝":48.3,"彭明敏":22.6,"林洋港":17.8}},"桃園市":{"win":"李登輝","c":{"陳履安":12.0,"李登輝":55.8,"彭明敏":15.2,"林洋港":17.0}},"新竹縣":{"win":"李登輝","c":{"陳履安":11.7,"李登輝":66.2,"彭明敏":11.1,"林洋港":11.0}},"新竹市":{"win":"李登輝","c":{"陳履安":12.9,"李登輝":53.7,"彭明敏":16.2,"林洋港":17.2}},"苗栗縣":{"win":"李登輝","c":{"陳履安":10.3,"李登輝":69.9,"彭明敏":10.7,"林洋港":9.1}},"台中市":{"win":"李登輝","c":{"陳履安":10.4,"李登輝":55.0,"彭明敏":17.5,"林洋港":17.1}}},"2000":{"台北市":{"win":"宋楚瑜","c":{"宋楚瑜":39.8,"連戰":21.9,"李敖":0.1,"許信良":0.5,"陳水扁":37.6}},"新北市":{"win":"宋楚瑜","c":{"宋楚瑜":40.3,"連戰":22.4,"李敖":0.1,"許信良":0.5,"陳水扁":36.7}},"桃園市":{"win":"宋楚瑜","c":{"宋楚瑜":43.8,"連戰":22.1,"李敖":0.1,"許信良":2.2,"陳水扁":31.7}},"新竹縣":{"win":"宋楚瑜","c":{"宋楚瑜":51.6,"連戰":20.7,"李敖":0.1,"許信良":2.9,"陳水扁":24.8}},"新竹市":{"win":"宋楚瑜","c":{"宋楚瑜":42.8,"連戰":22.4,"李敖":0.1,"許信良":0.8,"陳水扁":33.8}},"苗栗縣":{"win":"宋楚瑜","c":{"宋楚瑜":49.6,"連戰":22.2,"李敖":0.1,"許信良":1.2,"陳水扁":26.8}},"台中市":{"win":"宋楚瑜","c":{"宋楚瑜":39.4,"連戰":23.4,"李敖":0.1,"許信良":0.5,"陳水扁":36.6}}},"2004":{"台北市":{"win":"連戰","c":{"陳水扁":43.5,"連戰":56.5}},"新北市":{"win":"連戰","c":{"陳水扁":46.9,"連戰":53.1}},"桃園市":{"win":"連戰","c":{"陳水扁":44.7,"連戰":55.3}},"新竹縣":{"win":"連戰","c":{"陳水扁":35.9,"連戰":64.1}},"新竹市":{"win":"連戰","c":{"陳水扁":44.9,"連戰":55.1}},"苗栗縣":{"win":"連戰","c":{"陳水扁":39.2,"連戰":60.8}},"台中市":{"win":"陳水扁","c":{"陳水扁":50.0,"連戰":50.0}}},"2008":{"台北市":{"win":"馬英九","c":{"謝長廷":37.0,"馬英九":63.0}},"新北市":{"win":"馬英九","c":{"謝長廷":38.9,"馬英九":61.1}},"桃園市":{"win":"馬英九","c":{"謝長廷":35.4,"馬英九":64.6}},"新竹縣":{"win":"馬英九","c":{"謝長廷":26.0,"馬英九":74.0}},"新竹市":{"win":"馬英九","c":{"謝長廷":35.3,"馬英九":64.7}},"苗栗縣":{"win":"馬英九","c":{"謝長廷":29.0,"馬英九":71.0}},"台中市":{"win":"馬英九","c":{"謝長廷":40.0,"馬英九":60.0}}},"2012":{"台北市":{"win":"馬英九","c":{"蔡英文":39.5,"馬英九":57.9,"宋楚瑜":2.6}},"新北市":{"win":"馬英九","c":{"蔡英文":43.5,"馬英九":53.7,"宋楚瑜":2.8}},"桃園市":{"win":"馬英九","c":{"蔡英文":39.9,"馬英九":57.2,"宋楚瑜":2.9}},"新竹縣":{"win":"馬英九","c":{"蔡英文":30.9,"馬英九":65.8,"宋楚瑜":3.3}},"新竹市":{"win":"馬英九","c":{"蔡英文":39.5,"馬英九":57.4,"宋楚瑜":3.1}},"苗栗縣":{"win":"馬英九","c":{"蔡英文":33.2,"馬英九":63.8,"宋楚瑜":3.0}},"台中市":{"win":"馬英九","c":{"蔡英文":44.7,"馬英九":52.2,"宋楚瑜":3.2}}},"2016":{"台北市":{"win":"蔡英文","c":{"朱立倫":37.5,"蔡英文":52.0,"宋楚瑜":10.6}},"新北市":{"win":"蔡英文","c":{"朱立倫":33.3,"蔡英文":54.8,"宋楚瑜":11.9}},"桃園市":{"win":"蔡英文","c":{"朱立倫":34.4,"蔡英文":51.0,"宋楚瑜":14.6}},"新竹縣":{"win":"蔡英文","c":{"朱立倫":35.3,"蔡英文":42.5,"宋楚瑜":22.2}},"新竹市":{"win":"蔡英文","c":{"朱立倫":32.4,"蔡英文":51.2,"宋楚瑜":16.4}},"苗栗縣":{"win":"蔡英文","c":{"朱立倫":37.5,"蔡英文":45.5,"宋楚瑜":17.0}},"台中市":{"win":"蔡英文","c":{"朱立倫":29.8,"蔡英文":55.0,"宋楚瑜":15.2}}},"2020":{"台北市":{"win":"蔡英文","c":{"宋楚瑜":4.3,"韓國瑜":42.0,"蔡英文":53.7}},"新北市":{"win":"蔡英文","c":{"宋楚瑜":4.6,"韓國瑜":38.9,"蔡英文":56.5}},"桃園市":{"win":"蔡英文","c":{"宋楚瑜":4.8,"韓國瑜":40.4,"蔡英文":54.8}},"新竹縣":{"win":"韓國瑜","c":{"宋楚瑜":5.7,"韓國瑜":47.4,"蔡英文":46.9}},"新竹市":{"win":"蔡英文","c":{"宋楚瑜":5.4,"韓國瑜":39.3,"蔡英文":55.3}},"苗栗縣":{"win":"韓國瑜","c":{"宋楚瑜":4.7,"韓國瑜":50.3,"蔡英文":45.0}},"台中市":{"win":"蔡英文","c":{"宋楚瑜":5.0,"韓國瑜":38.1,"蔡英文":57.0}}},"2024":{"台北市":{"win":"賴清德","c":{"柯文哲":23.8,"賴清德":38.1,"侯友宜":38.1}},"新北市":{"win":"賴清德","c":{"柯文哲":26.2,"賴清德":38.6,"侯友宜":35.2}},"桃園市":{"win":"賴清德","c":{"柯文哲":30.6,"賴清德":35.3,"侯友宜":34.1}},"新竹縣":{"win":"侯友宜","c":{"柯文哲":35.6,"賴清德":27.4,"侯友宜":37.0}},"新竹市":{"win":"賴清德","c":{"柯文哲":34.3,"賴清德":34.8,"侯友宜":30.9}},"苗栗縣":{"win":"侯友宜","c":{"柯文哲":30.0,"賴清德":28.8,"侯友宜":41.2}},"台中市":{"win":"賴清德","c":{"柯文哲":30.1,"賴清德":37.6,"侯友宜":32.4}}}}};

const TILES = ["台北市","新北市","桃園市","新竹市","新竹縣","苗栗縣","台中市"];
// display rows north -> south (geographic corridor)
const ROWS = [["新北市","台北市"],["桃園市"],["新竹市","新竹縣"],["苗栗縣"],["台中市"]];

const PARTY_COLOR = {
  "國民黨":"#0b3aa3","民進黨":"#1f9d52","民眾黨":"#19b3b3","親民黨":"#f0660f",
  "新黨":"#d4a017","台聯":"#b5152e","建國黨":"#7a3fb0","無黨籍":"#8a8278"
};
const pc = (p)=>PARTY_COLOR[p]||"#8a8278";

function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]];}return a;}

// give every candidate a stable id
const CANDS = DATA.cands.map((c,i)=>({...c,id:i}));
const WINNERS = CANDS.filter(c=>c.w===1);
const LOSERS = CANDS.filter(c=>c.w===0);

// wildcard pool: (year, president) that carried >=1 of our tiles
const WILDPOOL = (()=>{
  const out=[]; const seen=new Set();
  Object.entries(DATA.prez).forEach(([y,td])=>{
    const carriers={};
    Object.entries(td).forEach(([tile,info])=>{
      (carriers[info.win]=carriers[info.win]||[]).push(tile);
    });
    Object.entries(carriers).forEach(([name,tiles])=>{
      const k=y+name; if(seen.has(k))return; seen.add(k);
      out.push({y:+y,n:name,tiles});
    });
  });
  return out;
})();

function dealHand(claimed, used){
  const avail = c => !used.has(c.id);
  const unclaimedW = shuffle(WINNERS.filter(c=>avail(c) && !claimed.has(c.t)));
  const hand=[];
  const nGood = Math.min(unclaimedW.length, 1+((Math.random()*2)|0)); // 1-2 winnable
  for(let i=0;i<nGood;i++) hand.push(unclaimedW[i]);
  const traps = shuffle([
    ...LOSERS.filter(avail),
    ...WINNERS.filter(c=>avail(c) && claimed.has(c.t))
  ]);
  let i=0;
  while(hand.length<5 && i<traps.length){
    const c=traps[i++];
    if(!hand.some(h=>h.id===c.id) && !hand.some(h=>h.n===c.n && h.y===c.y)) hand.push(c);
  }
  // fallback pad
  const any = shuffle(CANDS.filter(avail));
  i=0;
  while(hand.length<5 && i<any.length){
    const c=any[i++];
    if(!hand.some(h=>h.id===c.id)) hand.push(c);
  }
  return shuffle(hand);
}

const MAX_ROUNDS = 6;
const START_WILDS = 2;

export default function App(){
  const [phase,setPhase] = useState("intro"); // intro|select|reveal|over
  const [showDist,setShowDist] = useState(true);
  const [round,setRound] = useState(1);
  const [hand,setHand] = useState([]);
  const [sel,setSel] = useState([]);
  const [used,setUsed] = useState(()=>new Set());
  const [claimed,setClaimed] = useState(()=>({})); // tile -> {n,y,p,how}
  const [revealed,setRevealed] = useState([]); // resolved cards this round
  const [wilds,setWilds] = useState([]);
  const [wildMode,setWildMode] = useState(null); // active wildcard obj
  const [wildMsg,setWildMsg] = useState(null);
  const [rerolls,setRerolls] = useState(1);

  const claimedSet = useMemo(()=>new Set(Object.keys(claimed)),[claimed]);
  const claimedCount = Object.keys(claimed).length;

  function start(){
    const u=new Set();
    const h=dealHand(new Set(),u);
    h.forEach(c=>u.add(c.id));
    setUsed(u); setHand(h); setSel([]); setClaimed({}); setRound(1);
    setRevealed([]); setWilds(shuffle(WILDPOOL).slice(0,START_WILDS));
    setWildMode(null); setWildMsg(null); setRerolls(1); setPhase("select");
  }

  function toggleSel(c){
    if(phase!=="select")return;
    if(sel.some(s=>s.id===c.id)) setSel(sel.filter(s=>s.id!==c.id));
    else if(sel.length<2) setSel([...sel,c]);
  }

  function confirm(){
    if(sel.length===0)return;
    const nc={...claimed}; const res=[];
    sel.forEach(c=>{
      let how="lose";
      if(c.w===1){
        if(nc[c.t]) how="dupe";
        else { nc[c.t]={n:c.n,y:c.y,p:c.p,how:"mayor",pct:c.pct}; how="claim"; }
      }
      res.push({...c,how});
    });
    setClaimed(nc); setRevealed(res); setPhase("reveal");
  }

  function next(){
    const newCount=Object.keys(claimed).length;
    if(newCount>=7){ setPhase("over"); return; }
    if(round>=MAX_ROUNDS){ setPhase("over"); return; }
    const u=new Set(used);
    const h=dealHand(claimedSet,u);
    h.forEach(c=>u.add(c.id));
    setUsed(u); setHand(h); setSel([]); setRevealed([]); setRound(round+1); setPhase("select");
  }

  function reroll(){
    if(rerolls<=0||phase!=="select")return;
    const u=new Set(used);
    const h=dealHand(claimedSet,u);
    h.forEach(c=>u.add(c.id));
    setUsed(u); setHand(h); setSel([]); setRerolls(rerolls-1);
  }

  function placeWild(tile){
    if(!wildMode||claimed[tile])return;
    const info = DATA.prez[wildMode.y]?.[tile];
    const carried = info && info.win===wildMode.n;
    const pctv = info ? info.c[wildMode.n] : null;
    if(carried){
      setClaimed({...claimed,[tile]:{n:wildMode.n,y:wildMode.y,p:"總統",how:"wild",pct:(pctv!=null?pctv+"%":"")}});
    }
    setWildMsg({y:wildMode.y,n:wildMode.n,tile,carried,pct:pctv,winner:info?info.win:""});
    setWilds(wilds.filter(w=>!(w.y===wildMode.y&&w.n===wildMode.n)));
    setWildMode(null);
    if(Object.keys(claimed).length+ (carried?1:0) >=7){ /* let user see msg then over via button */ }
  }

  const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700;900&family=Noto+Sans+TC:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap');
  .wrap *{box-sizing:border-box;}
  .wrap{font-family:'Noto Sans TC',sans-serif;color:#ece3d2;}
  .serif{font-family:'Noto Serif TC',serif;}
  .mono{font-family:'JetBrains Mono',monospace;}
  .grain{position:absolute;inset:0;opacity:.05;pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}
  .card{transition:transform .15s ease, box-shadow .15s ease;}
  .card:hover{transform:translateY(-4px);}
  .flip{animation:flip .5s ease both;}
  @keyframes flip{0%{transform:rotateY(90deg);opacity:0}100%{transform:rotateY(0);opacity:1}}
  .pop{animation:pop .4s cubic-bezier(.2,1.4,.4,1) both;}
  @keyframes pop{0%{transform:scale(.7);opacity:0}100%{transform:scale(1);opacity:1}}
  .seal{animation:seal .35s cubic-bezier(.2,1.6,.3,1) both;}
  @keyframes seal{0%{transform:scale(2) rotate(-18deg);opacity:0}60%{opacity:1}100%{transform:scale(1) rotate(-12deg);opacity:1}}
  .btn{transition:all .12s ease;cursor:pointer;}
  .btn:hover{filter:brightness(1.12);} .btn:active{transform:translateY(1px);}
  .tile{transition:all .18s ease;cursor:default;}
  .tilewild{cursor:pointer;} .tilewild:hover{transform:scale(1.03);box-shadow:0 0 0 2px #d4b483 inset;}
  `;

  // ---- screens ----
  const Header = () => (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",
      borderBottom:"3px double #6b5d45",paddingBottom:10,marginBottom:16,flexWrap:"wrap",gap:8}}>
      <div>
        <div className="serif" style={{fontSize:30,fontWeight:900,letterSpacing:2,lineHeight:1}}>
          縣市長 <span style={{color:"#d24b3e"}}>開票夜</span>
        </div>
        <div className="mono" style={{fontSize:11,color:"#a89878",marginTop:4,letterSpacing:1}}>
          NORTH–CENTRAL · 解嚴後直轄市縣市長 · 仿 82-0
        </div>
      </div>
      <div style={{textAlign:"right"}}>
        <div className="mono" style={{fontSize:26,fontWeight:700,color:claimedCount===7?"#e8c14a":"#ece3d2"}}>
          {claimedCount}<span style={{color:"#7a6c52",fontSize:16}}>/7</span>
        </div>
        <div className="mono" style={{fontSize:11,color:"#a89878"}}>ROUND {Math.min(round,MAX_ROUNDS)}/{MAX_ROUNDS}</div>
      </div>
    </div>
  );

  const Board = () => (
    <div style={{display:"flex",flexDirection:"column",gap:7,alignItems:"center"}}>
      {ROWS.map((row,ri)=>(
        <div key={ri} style={{display:"flex",gap:7,justifyContent:"center"}}>
          {row.map(t=>{
            const c=claimed[t]; const active=!!wildMode && !c;
            return (
              <div key={t} className={"tile "+(active?"tilewild":"")}
                onClick={()=>active&&placeWild(t)}
                style={{width:96,padding:"9px 6px",borderRadius:7,textAlign:"center",
                  border:"1px solid "+(c?"transparent":"#4a4233"),
                  background:c?(c.how==="wild"?"#7a3b2e":pc(c.p)):"#1b1812",
                  boxShadow:c?"0 4px 14px rgba(0,0,0,.4)":"none",position:"relative",
                  outline:active?"2px dashed #d4b483":"none"}}>
                <div className="serif" style={{fontWeight:700,fontSize:15,color:c?"#fff":"#cfc3aa"}}>{t}</div>
                {c
                  ? <div style={{marginTop:2}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{c.n}</div>
                      <div className="mono" style={{fontSize:9,color:"rgba(255,255,255,.75)"}}>
                        {c.how==="wild"?"鬼牌 "+c.y:c.y}{c.pct?" · "+c.pct:""}
                      </div>
                    </div>
                  : <div className="mono" style={{fontSize:9,color:"#5f5641",marginTop:3}}>未定</div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const Wilds = () => wilds.length>0 && (
    <div style={{marginTop:16}}>
      <div className="mono" style={{fontSize:10,color:"#a89878",marginBottom:6,letterSpacing:1}}>
        鬼牌 · 總統 WILDCARDS（任選一塊未定領土；當年贏對手即拿下）
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {wilds.map((w,i)=>{
          const on = wildMode && wildMode.y===w.y && wildMode.n===w.n;
          return (
            <div key={i} className="btn" onClick={()=>setWildMode(on?null:w)}
              style={{padding:"8px 12px",borderRadius:6,border:"1px dashed #c9a24b",
                background:on?"#3a2e16":"#221c10",minWidth:120}}>
              <div className="mono" style={{fontSize:10,color:"#d4b483"}}>★ 鬼牌 {w.y}</div>
              <div className="serif" style={{fontSize:18,fontWeight:700,color:"#f0e4c8"}}>{w.n}</div>
              <div className="mono" style={{fontSize:9,color:on?"#e8c14a":"#8a7c5c"}}>
                {on?"▼ 點地圖落子":"點此啟用"}
              </div>
            </div>
          );
        })}
      </div>
      {wildMode && <div className="mono" style={{fontSize:10,color:"#e8c14a",marginTop:6}}>
        選擇一塊「未定」領土投放 {wildMode.y} {wildMode.n}…（再點鬼牌取消）</div>}
      {wildMsg && <div className="pop" style={{marginTop:8,padding:"8px 12px",borderRadius:6,
        background:wildMsg.carried?"#1d3a25":"#3a1d1d",
        border:"1px solid "+(wildMsg.carried?"#2f7a45":"#7a2f2f"),fontSize:13}}>
        <b>{wildMsg.y} {wildMsg.n}</b> 在 <b>{wildMsg.tile}</b> 得 {wildMsg.pct}% — {wildMsg.carried
          ? <span style={{color:"#7fe0a0"}}>領先群雄，拿下！</span>
          : <span style={{color:"#e89a9a"}}>不敵 {wildMsg.winner}，未能拿下。</span>}
      </div>}
    </div>
  );

  const Card = ({c,idx}) => {
    const chosen = sel.some(s=>s.id===c.id);
    return (
      <div className="card pop" onClick={()=>toggleSel(c)}
        style={{flex:"1 1 0",minWidth:120,maxWidth:175,cursor:phase==="select"?"pointer":"default",
          background:"linear-gradient(165deg,#f5ecd6,#e7d9b8)",borderRadius:9,padding:"16px 12px",
          color:"#2a2317",textAlign:"center",position:"relative",
          border:"1px solid #c9b88f",animationDelay:(idx*0.05)+"s",
          boxShadow:chosen?"0 0 0 3px #d24b3e, 0 8px 20px rgba(0,0,0,.45)":"0 5px 14px rgba(0,0,0,.35)",
          transform:chosen?"translateY(-4px)":"none"}}>
        <div className="mono" style={{fontSize:11,color:"#9a824f",letterSpacing:1}}>{c.y}</div>
        <div className="serif" style={{fontSize:25,fontWeight:900,margin:"4px 0",lineHeight:1.1}}>{c.n}</div>
        <div className="mono" style={{fontSize:11,color:"#8a7340",borderTop:"1px solid #cdbb90",paddingTop:6,marginTop:6}}>
          {showDist? c.t+" 候選" : "？？？"}
        </div>
        {chosen && <div className="seal" style={{position:"absolute",top:8,right:8,
          border:"2px solid #d24b3e",color:"#d24b3e",borderRadius:"50%",width:30,height:30,
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,
          transform:"rotate(-12deg)"}}>選</div>}
      </div>
    );
  };

  const RevealCard = ({c,idx}) => {
    const good=c.how==="claim";
    const tag = c.how==="claim"?"當選 · 拿下":c.how==="dupe"?"當選 · 但已是你的":"落選 · 沒了";
    const col = c.how==="claim"?"#2f7a45":c.how==="dupe"?"#9a7d2e":"#9a3030";
    return (
      <div className="flip" style={{flex:"1 1 0",minWidth:120,maxWidth:175,borderRadius:9,padding:"16px 12px",
        textAlign:"center",position:"relative",color:"#fff",animationDelay:(idx*0.08)+"s",
        background:pc(c.p),border:"1px solid rgba(255,255,255,.2)",
        boxShadow:"0 6px 18px rgba(0,0,0,.45)",opacity:good?1:.82}}>
        <div className="mono" style={{fontSize:11,opacity:.85}}>{c.y} · {c.t}</div>
        <div className="serif" style={{fontSize:24,fontWeight:900,margin:"3px 0"}}>{c.n}</div>
        <div style={{fontSize:12,fontWeight:700}}>{c.p}</div>
        <div className="mono" style={{fontSize:11,opacity:.9,marginTop:2}}>{c.pct}</div>
        <div style={{marginTop:8,padding:"3px 6px",borderRadius:5,fontSize:12,fontWeight:700,
          background:"rgba(0,0,0,.28)",color:good?"#bfffcf":"#ffd9d9"}}>
          <span style={{color:col==="#2f7a45"?"#9ff0bd":col==="#9a7d2e"?"#ffe49a":"#ffb3b3"}}>{tag}</span>
        </div>
      </div>
    );
  };

  // ----- render -----
  if(phase==="intro"){
    return (
      <div className="wrap" style={{position:"relative",background:"#15120c",minHeight:560,padding:"32px 22px",borderRadius:12,overflow:"hidden"}}>
        <style>{css}</style><div className="grain"/>
        <div style={{maxWidth:620,margin:"0 auto",position:"relative"}}>
          <div className="serif" style={{fontSize:46,fontWeight:900,lineHeight:1.05,letterSpacing:1}}>
            縣市長<br/><span style={{color:"#d24b3e"}}>開票夜</span></div>
          <div className="mono" style={{fontSize:12,color:"#a89878",marginTop:10,letterSpacing:1}}>能不能跑出 7–0？</div>
          <div style={{fontSize:14.5,lineHeight:1.85,color:"#cfc3aa",marginTop:20}}>
            每回合發 <b style={{color:"#f0e4c8"}}>5 位候選人</b>，只給<b>年份</b>與<b>姓名</b>——政黨、勝負都藏起來。
            你挑 <b style={{color:"#f0e4c8"}}>2 位</b>，當年真的<b>當選</b>的，就把那塊領土插旗。落選的，這張就廢了。<br/>
            北中走廊 <b style={{color:"#f0e4c8"}}>7 塊領土</b>，{MAX_ROUNDS} 回合內全部點亮就是滿貫。<br/>
            另有 <b style={{color:"#d4b483"}}>★ 鬼牌（總統）</b>2 張：任選一塊未定領土，那位總統候選人當年在那縣市<b>贏過對手</b>就直接拿下。
          </div>
          <div style={{display:"flex",gap:14,alignItems:"center",marginTop:22,flexWrap:"wrap"}}>
            <button className="btn serif" onClick={start}
              style={{background:"#d24b3e",color:"#fff",border:"none",borderRadius:8,
                padding:"13px 30px",fontSize:19,fontWeight:700}}>開始開票 →</button>
            <label className="mono" style={{fontSize:12,color:"#cfc3aa",display:"flex",alignItems:"center",gap:7,cursor:"pointer"}}>
              <input type="checkbox" checked={showDist} onChange={e=>setShowDist(e.target.checked)}/>
              卡片顯示選區（取消＝困難模式，全靠記人）
            </label>
          </div>
        </div>
      </div>
    );
  }

  if(phase==="over"){
    const win=claimedCount>=7;
    return (
      <div className="wrap" style={{position:"relative",background:"#15120c",minHeight:560,padding:"30px 22px",borderRadius:12,overflow:"hidden"}}>
        <style>{css}</style><div className="grain"/>
        <div style={{maxWidth:640,margin:"0 auto",position:"relative"}}>
          <div className="serif" style={{fontSize:15,color:"#a89878",letterSpacing:2}}>最終戰報</div>
          <div className="serif" style={{fontSize:54,fontWeight:900,color:win?"#e8c14a":"#ece3d2",lineHeight:1}}>
            {claimedCount}–{7-claimedCount}</div>
          <div className="serif" style={{fontSize:22,fontWeight:700,marginTop:6,color:win?"#e8c14a":"#d24b3e"}}>
            {win?"★ 大滿貫！七塊領土全收 ★":claimedCount>=5?"差一步，再來一局？":claimedCount>=3?"普通，記憶還能更利":"開票翻車了"}
          </div>
          <div style={{marginTop:20}}><Board/></div>
          <button className="btn serif" onClick={start}
            style={{marginTop:24,background:"#d24b3e",color:"#fff",border:"none",borderRadius:8,
              padding:"12px 28px",fontSize:18,fontWeight:700}}>再來一局 ↺</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap" style={{position:"relative",background:"#15120c",minHeight:560,padding:"22px 20px",borderRadius:12,overflow:"hidden"}}>
      <style>{css}</style><div className="grain"/>
      <div style={{maxWidth:780,margin:"0 auto",position:"relative"}}>
        <Header/>
        <Board/>
        <Wilds/>
        <div style={{borderTop:"1px solid #332c20",margin:"18px 0 14px"}}/>
        {phase==="select" && <>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
            <div className="mono" style={{fontSize:12,color:"#a89878"}}>
              挑 2 位你認為<b style={{color:"#f0e4c8"}}>當選</b>的（{sel.length}/2）
            </div>
            <div style={{display:"flex",gap:8}}>
              {rerolls>0 && <button className="btn mono" onClick={reroll}
                style={{background:"#2a2316",color:"#d4b483",border:"1px solid #5a4d35",borderRadius:6,padding:"6px 12px",fontSize:12}}>↻ 重發（{rerolls}）</button>}
              <button className="btn serif" onClick={confirm} disabled={sel.length===0}
                style={{background:sel.length?"#2f7a45":"#2a2820",color:sel.length?"#fff":"#5f5641",
                  border:"none",borderRadius:6,padding:"7px 18px",fontSize:15,fontWeight:700,
                  cursor:sel.length?"pointer":"default"}}>開票 ▸</button>
            </div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {hand.map((c,i)=><Card key={c.id} c={c} idx={i}/>)}
          </div>
        </>}
        {phase==="reveal" && <>
          <div className="mono" style={{fontSize:12,color:"#a89878",marginBottom:10}}>開票結果：</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {revealed.map((c,i)=><RevealCard key={c.id} c={c} idx={i}/>)}
          </div>
          <button className="btn serif" onClick={next}
            style={{marginTop:16,background:"#d24b3e",color:"#fff",border:"none",borderRadius:8,
              padding:"11px 26px",fontSize:16,fontWeight:700}}>
            {claimedCount>=7?"看最終戰報 →":round>=MAX_ROUNDS?"看最終戰報 →":"下一回合 →"}
          </button>
        </>}
      </div>
    </div>
  );
}
