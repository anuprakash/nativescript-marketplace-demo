import model = require("./layouts-view-model");
import listViewModule = require("nativescript-telerik-ui-pro/listview");
import applicationModule = require("application");
import frame = require("ui/frame");
import colorModule = require("color");
import * as navigator from "../../../common/navigator";

var viewModel: model.ListViewLayoutsModel = new model.ListViewLayoutsModel();
var listView;

export function pageNavigatingTo(args: any) {
    var page = args.object;
    page.bindingContext = viewModel;
    listView = page.getViewById("list-view");
    viewModel.isLinearActive = true;
    viewModel.isWrapActive = false;

    if (applicationModule.android && android.os.Build.VERSION > 18) {
        var window = applicationModule.android.foregroundActivity.getWindow();
        window.addFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    }
}

export function pageNavigatedFrom(args: any) {
    if (applicationModule.android && android.os.Build.VERSION > 18) {
        var window = applicationModule.android.foregroundActivity.getWindow();
        window.clearFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
    }
}

export function onLinearLayoutTap(args: any) {
    var linearLayout = new listViewModule.ListViewLinearLayout();
    linearLayout.itemHeight = 250;
    listView.listViewLayout = linearLayout;
    viewModel.isLinearActive = true;
    if (linearLayout.ios) {
        linearLayout.ios.dynamicItemSize = false;
    }
    viewModel.isWrapActive = false;
}

export function onGridLayoutTap(args: any) {
    var gridLayout = new listViewModule.ListViewGridLayout();
    gridLayout.spanCount = 2;
    gridLayout.itemHeight = 250;
    listView.listViewLayout = gridLayout;
    viewModel.isLinearActive = false;
    viewModel.isWrapActive = true;
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}
