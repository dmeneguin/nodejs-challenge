const point = (x,y) => {return {x,y}};

function calculateSegmentIntersectionLength(segmentAX1,segmentAX2,segmentBX1,segmentBX2){
    let intersectionLength = 0;
    const scenario1 = segmentAX1<=segmentBX1 && segmentAX2>=segmentBX1 && segmentAX2<=segmentBX2;
    const scenario2 = segmentAX1>=segmentBX1 && segmentAX1<=segmentBX2 && segmentAX2>=segmentBX2;
    const scenario3 = segmentAX1<=segmentBX1 && segmentAX2>=segmentBX1 && segmentAX2>=segmentBX2;
    const scenario4 = segmentAX1>=segmentBX1 && segmentAX2>=segmentBX1 && segmentAX2<=segmentBX2;    
    if(scenario1){
        intersectionLength = segmentAX2-segmentBX1+1;
    }
    else if(scenario2){
        intersectionLength = segmentBX2-segmentAX1+1;
    }
    else if(scenario3){
        intersectionLength = segmentBX2-segmentBX1+1;
    }
    else if(scenario4){
        intersectionLength = segmentAX2-segmentAX1+1;
    }
    return intersectionLength;
}

function areaOfIntersection(rectangleA, rectangleB){
    const lengthX = calculateSegmentIntersectionLength(rectangleA[0].x,rectangleA[1].x,rectangleB[0].x,rectangleB[1].x);
    const lengthY = calculateSegmentIntersectionLength(rectangleA[0].y,rectangleA[1].y,rectangleB[0].y,rectangleB[1].y);
    return lengthX * lengthY;
}

const A = [point(3,5),point(11,11)];
const B = [point(7,2),point(13,7)];
const C = [point(11,11),point(15,13)];

console.log(areaOfIntersection(A,B));
console.log(areaOfIntersection(A,C));
console.log(areaOfIntersection(B,C));