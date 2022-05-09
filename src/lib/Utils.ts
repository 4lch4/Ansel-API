import { AppConfig } from '../configs'

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Build a URL to the given image within the given directory.
 *
 * For example, if given `wave` as the directory, and `wave-0.gif` as the
 * filename, the resulting URL will be:
 *
 * https://i.ansel.rest/wave/wave-0.gif
 *
 * @param directory The Directory containing the file.
 * @param filename The name of the file/img to return.
 * @returns A URL that resolves to the raw img.
 */
export function getImageUrl(directory: string, filename: string) {
  return `${AppConfig.imgBaseUrl}/${directory}/${filename}`
}
