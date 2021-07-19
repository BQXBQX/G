import { PathStyleProps } from '@antv/g';
import { ElementRenderer } from '.';
import { injectable } from 'inversify';

@injectable()
export class PathRenderer implements ElementRenderer<PathStyleProps> {
  apply($el: SVGElement, attributes: PathStyleProps) {
    // @ts-ignore
    const { path, x, y } = attributes;

    $el.setAttribute('d', this.formatPath(path));
    // FIXME offset xy
  }

  private formatPath(value: any[]) {
    const newValue = value
      .map((path) => {
        return path.join(' ');
      })
      .join('');
    if (~newValue.indexOf('NaN')) {
      return '';
    }
    return newValue;
  }
}
