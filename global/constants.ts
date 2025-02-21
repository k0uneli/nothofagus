// video paths
export const VIDEO_PATH = "static/videos/";
export const TEST_VIDEO = "test.mp4";
export const VIDEO_SRC = VIDEO_PATH + TEST_VIDEO;

// video blocks, max of 10MB per request/video
export const NUM_BLOCKS_PER_REQ = 10;
export const BLOCK_SIZE = 1024 * 1024;
export const VIDEO_BLOCK_SIZE = NUM_BLOCKS_PER_REQ * BLOCK_SIZE;