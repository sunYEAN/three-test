export function getSlopeOfLine(x1,y1,x2,y2){
    let ox = x2 - x1 , oy = y2 - y1;
    let sign = ox > 0 ? 1:-1;
    if( Math.abs(ox - 0) < 0.001 ){   //直线与x轴垂直
        return sign*Number.MAX_VALUE;
    }else if( Math.abs(oy - 0) < 0.001 ){ //直线与x轴平行
        return 0;
    }else{ //其它情况
        return oy/ox;
    }
}

export function intersection(x1,y1,x2,y2,cx,cy,r,segment){
    /*
      算法参考链接：http://mathworld.wolfram.com/Circle-LineIntersection.html
     */
    /*
    保存原有数据，并将设置直线偏移（原因是下面的算法中的圆的圆心是在原点的）
     */
    let ox1 = x1 , ox2 = x2 , oy1 = y1 , oy2 = y2;
    x1 -= cx;
    y1 -= cy;
    x2 -= cx;
    y2 -= cy;
    /*
    计算交点
     */
    let dx =  x2 - x1,
        dy = y2 - y1,
        dr = Math.sqrt( Math.pow(dx,2) + Math.pow(dy,2) ),
        D = x1*y2 - x2*y1,
        sign = dy>0 ? 1 : -1;
    let theta = Math.sqrt(r*r*dr*dr - D*D);
    let ix1 = ( D*dy - sign*dx*theta ) / (dr*dr);
    let iy1 = ( -D*dy - Math.abs(dy)*theta ) / (dr*dr);
    let ix2 = ( D*dy + sign*dx*theta ) / (dr*dr);
    let iy2 = ( -D*dy + Math.abs(dy)*theta ) / (dr*dr);
    let rx1 = cx+ix1 ,ry1 = cy+iy1 ,rx2 = cx+ix2 ,ry2 = cy+iy2 ;
    /*
    检查交点是否线段上
     */
    let flag1,flag2;
    segment = segment === false ? false : true;
    if(segment) {
        flag1 = ox1 < ox2 ? ( rx1 >= ox1 && rx1 <= ox2) : ( rx1 <= ox1 && rx1 >= ox2);
        flag1 = flag1 && ( oy1 < oy2 ? ( ry1 >= oy1 && ry1 <= oy2) : ( ry1 <= oy1 && ry1 >= oy2) );
        flag2 = ox1 < ox2 ? ( rx2 >= ox1 && rx2 <= ox2) : ( rx2 <= ox1 && rx2 >= ox2);
        flag2 = flag2 && ( oy1 < oy2 ? ( ry2 >= oy1 && ry2 <= oy2) : ( ry2 <= oy1 && ry2 >= oy2) );
    }else{
        flag1 = flag2 = true;
    }
    let length = (flag1?1:0) + (flag2?1:0);
    return {
        x1: flag1 ? rx1 : undefined ,
        y1:flag1 ? ry1 : undefined ,
        x2:flag2 ? rx2 : undefined ,
        y2:flag2 ? ry2 : undefined ,
        length:length
    };
}

export function lengthOfLine(x1,y1,x2,y2){
    let ox = Math.pow((x2-x1),2);
    let oy = Math.pow((y2-y1),2);
    return Math.sqrt(ox+oy);
}
