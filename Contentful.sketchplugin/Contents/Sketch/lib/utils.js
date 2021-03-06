
//--------------------------------------//
//               Context                //
//--------------------------------------//

var app = NSApplication.sharedApplication(),
    selection,
    plugin,
    command,
    doc,
    docData,
    page,
    artboard,
    resourcesPath = "constraints@2x.png",
    constraintsKey = "@constraints"

function initContext(context) {
    doc = context.document;
    docData = context.document.documentData();
    plugin = context.plugin;
    command = context.command;
    page = doc.currentPage();
    // artboard = page.currentArtboard(),
    // selection = context.selection
}

//--------------------------------------//
//          Get Size & Position         //
//--------------------------------------//

var getSize = {
    width : function(layer) {
        return layer.frame().width()
    },
    widthProportion : function(layer) {
        return layer.frame().width()/layer.parentGroup().frame().width()
    },
    height : function(layer) {
        return layer.frame().height()
    },
    heightProportion : function(layer) {
        return layer.frame().height()/layer.parentGroup().frame().height()
    },
}


//--------------------------------------//
//               Cocoa UI               //
//--------------------------------------//
function createLabel(text, fontSize, bold, frame) {
    var label = NSTextField.alloc().initWithFrame(frame)
    label.setStringValue(text)
    label.setFont((bold) ? NSFont.boldSystemFontOfSize(fontSize) : NSFont.systemFontOfSize(fontSize))
    label.setBezeled(false)
    label.setDrawsBackground(false)
    label.setEditable(false)
    label.setSelectable(false)

    return label
}


function createWindow( values ) {
    var alert = COSAlertWindow.new()
    var width = 400;
    var freeSpace = width - 100;


    alert.addButtonWithTitle( 'Save' );
    alert.addButtonWithTitle( 'Cancel' );
    alert.setMessageText( 'Sketch Contentful' );
    alert.setInformativeText( 'Set your Space Id and Content Delivery Token to pull real production data into your designs.' );
    alert.setIcon( NSImage.alloc().initByReferencingFile( plugin.urlForResourceNamed( 'icon@2x.png' ).path() ) );

    var mainView = NSView.alloc().initWithFrame( NSMakeRect( 0, 0, width, 150 ) );
    var spaceIdLabel = createLabel( 'Space ID', 12, true, NSMakeRect( 0, 120, freeSpace, 20 ) );
    var spaceIdTextfield = NSTextField.alloc().initWithFrame( NSMakeRect( 0, 95, freeSpace, 25 ) );
    spaceIdTextfield.setStringValue( values.spaceId || '' );

    var cdaTokenLabel = createLabel( 'CDA Token', 12, true, NSMakeRect( 0, 60, freeSpace, 20 ) );
    var cdaTokenTextfield = NSTextField.alloc().initWithFrame( NSMakeRect( 0, 35, freeSpace, 25 ) );
    cdaTokenTextfield.setStringValue( values.cdaToken || '' );

    mainView.addSubview( spaceIdLabel );
    mainView.addSubview( spaceIdTextfield );

    mainView.addSubview( cdaTokenLabel );
    mainView.addSubview( cdaTokenTextfield );

    alert.addAccessoryView( mainView );

    var inputs = [ spaceIdTextfield, cdaTokenTextfield ];
    return [ alert, inputs ];
}