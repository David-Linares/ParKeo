
function regionContainingPoints(pointsIn) {
    let points = pointsIn.map(item => {
        return {
            latitude: cleanDouble(item.latitude),
            longitude: cleanDouble(item.longitude),
        };
    });

    var minX, maxX, minY, maxY;

    // init first point
    (point => {
        minX = point.latitude;
        maxX = point.latitude;
        minY = point.longitude;
        maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map(point => {
        minX = Math.min(minX, point.latitude);
        maxX = Math.max(maxX, point.latitude);
        minY = Math.min(minY, point.longitude);
        maxY = Math.max(maxY, point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;

    var deltaX = maxX - minX;
    var deltaY = maxY - minY;

    return {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX,
        longitudeDelta: deltaY + 0.05,
    };
}

function cleanDouble(value) {
    return parseFloat(value.toString().trim());
}

export {
    regionContainingPoints
}