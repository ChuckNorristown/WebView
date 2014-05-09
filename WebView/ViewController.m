//
//  ViewController.m
//  WebView
//
//  Created by Sean Shields on 5/1/14.
//  Copyright (c) 2014 Sean Shields. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSString* htmlFile = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"DischargeKit"];    
    NSString* htmlString = [NSString stringWithContentsOfFile:htmlFile encoding:NSUTF8StringEncoding error:nil];
    [_viewWeb loadHTMLString:htmlString baseURL:[NSURL fileURLWithPath:[htmlFile stringByDeletingLastPathComponent] isDirectory:YES]];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

@end
