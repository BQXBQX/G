import { injectable } from 'inversify';
import { SceneGraphNode } from '../components';
import { DisplayObject } from '../DisplayObject';

export const SceneGraphSelectorFactory = Symbol('SceneGraphSelectorFactory');
export const SceneGraphSelector = Symbol('SceneGraphSelector');
export interface SceneGraphSelector {
  selectOne(query: string, object: DisplayObject): DisplayObject | null;
  selectAll(query: string, object: DisplayObject): DisplayObject[];
  is(query: string, group: DisplayObject): boolean;
}

/**
 * support following DOM API
 * * getElementById
 * * getElementsByClassName
 * * getElementsByName
 * * getElementsByTag
 */
@injectable()
export class DefaultSceneGraphSelector implements SceneGraphSelector {
  selectOne(query: string, object: DisplayObject) {
    if (query.startsWith('#')) {
      // getElementById('id')
      return object.find(
        (node) => {
          const sceneGraphNode = node.getEntity().getComponent(SceneGraphNode);
          return !sceneGraphNode.shadow && sceneGraphNode.id === query.substring(1);
        },
      );
    }
    return null;
  }

  selectAll(query: string, object: DisplayObject) {
    // TODO: only support `[name="${name}"]` `.className`
    if (query.startsWith('.')) {
      // getElementsByClassName('className');
      // TODO: should include itself?
      return object.findAll(
        (node: DisplayObject) => node.getEntity().getComponent(SceneGraphNode).class === query.substring(1),
      );
    } else if (query.startsWith('[name=')) {
      // getElementsByName();
      return object.findAll(
        (node: DisplayObject) => node.name === query.substring(7, query.length - 2),
      );
    } else {
      // getElementsByTag('circle');
      return object.findAll((node) => node.nodeName === query);
    }
  }

  is(query: string, group: DisplayObject) {
    // TODO: need a simple `matches` implementation
    return true;
  }
}
