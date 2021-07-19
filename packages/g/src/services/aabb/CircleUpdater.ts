import { vec3 } from 'gl-matrix';
import { injectable } from 'inversify';
import { GeometryAABBUpdater } from '.';
import { AABB } from '../../shapes';
import { CircleStyleProps } from '../../shapes-export';

@injectable()
export class CircleUpdater implements GeometryAABBUpdater<CircleStyleProps> {
  dependencies = ['r', 'lineWidth', 'lineAppendWidth'];

  update(attributes: CircleStyleProps, aabb: AABB) {
    const { r = 0, lineWidth = 0, lineAppendWidth = 0 } = attributes;
    const center = vec3.create();
    const halfExtents = vec3.fromValues(r, r, 0);

    vec3.add(halfExtents, halfExtents, vec3.fromValues(lineWidth + lineAppendWidth, lineWidth + lineAppendWidth, 0));
    aabb.update(center, halfExtents);
  }
}
