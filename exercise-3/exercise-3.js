const point = (x,y) => {return {x,y}};

function verifySegmentIntersection(segmentAX1,segmentAX2,segmentBX1,segmentBX2){
    const scenario1 = segmentAX1<=segmentBX1 && segmentAX2>=segmentBX1 && segmentAX2<=segmentBX2;
    const scenario2 = segmentAX1>=segmentBX1 && segmentAX1<=segmentBX2 && segmentAX2>=segmentBX2;
    const scenario3 = segmentAX1<=segmentBX1 && segmentAX2>=segmentBX1 && segmentAX2>=segmentBX2;
    const scenario4 = segmentAX1>=segmentBX1 && segmentAX2>=segmentBX1 && segmentAX2<=segmentBX2;
    return (scenario1 || scenario2 || scenario3 || scenario4);
}

function instersects(rectangleA, rectangleB) {
    const intersectX = verifySegmentIntersection(rectangleA[0].x,rectangleA[1].x,rectangleB[0].x,rectangleB[1].x);
    const intersectY = verifySegmentIntersection(rectangleA[0].y,rectangleA[1].y,rectangleB[0].y,rectangleB[1].y);
    return intersectX && intersectY;
}

const A = [point(3,5),point(11,11)];
const B = [point(7,2),point(13,7)];
const C = [point(11,11),point(15,13)];

console.log(instersects(A,B));
console.log(instersects(A,C));
console.log(instersects(B,C));