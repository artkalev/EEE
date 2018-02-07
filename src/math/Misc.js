function IsPowerOfTwo(n) {
    return n && (n & (n - 1)) === 0;
}