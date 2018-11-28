import {Component, Input, ViewEncapsulation} from '@angular/core';
import {TimelineItem} from '../../subject-confirmation.service';

@Component({
  selector: 'app-info-popover',
  templateUrl: './info-popover.component.html',
  styleUrls: ['./info-popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoPopoverComponent {
  /** item da timeline */
  private _timelineItem: TimelineItem;
  @Input()
  get timelineItem(): TimelineItem {
    return this._timelineItem;
  }
  set timelineItem(t: TimelineItem) {
    this._timelineItem = t;

    this._buildPopoverText();
  }

  /** texto a ser apresentado quando existem junções */
  _mergedItemsText: string;

  _buildPopoverText(): void {
    this._mergedItemsText = '';

    if (!this._timelineItem || !this._timelineItem.performed) {
      return;
    }

    this._mergedItemsText = '';
    if (
      this._timelineItem.performed.mergedTimeLineItems &&
      this._timelineItem.performed.mergedTimeLineItems.length
    ) {
      this._mergedItemsText += `<strong>Just a test</strong>`;
    }
  }
}
