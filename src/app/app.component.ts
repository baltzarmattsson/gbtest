import { Component } from '@angular/core';
import { Wisibel, MenuButton, Menu } from "wisibel";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'gbexample';

	private wisibel: Wisibel = new Wisibel();

	// Corresponds to: https://wisibel.com/c/{tenantSlug}/{configuratorSlug}
	private tenantSlug: string = "linder";
	private configurator1Slug: string = "530arkip";
	private configurator2Slug: string = "boattester2";

	private wisibelContainer: HTMLElement;

	ngOnInit() {

	}

	ngAfterViewInit() {
		this.wisibelContainer = document.getElementById("wisibelContainer");
		this.initWisibelConfigurator(this.configurator1Slug);
	}

	public loadConfigurator1() {
		this.initWisibelConfigurator(this.configurator1Slug);
	}

	public loadConfigurator2() {
		this.initWisibelConfigurator(this.configurator2Slug);
	}

	private resetMenuButtonsByText() {
		// Reseting menu buttons since 
		this.menuButtonsByText = null;
	}

	public menuButtonsByText: { [nameEN: string]: MenuButton } = null;

	private initWisibelConfigurator(configuratorSlug: string) {

		// Reseting menu buttons since they are configurator unique
		this.resetMenuButtonsByText();


		this.wisibel.initConfigurator({
			configuratorSlug: configuratorSlug,
			tenantSlug: this.tenantSlug,
			menuCb: (menu: Menu) => {
				this.onWisibelMenuFetched(menu);
			},
			quality: "low",
			onContextNameClicked: () => { },
			rendererElement: this.wisibelContainer,
			cb: () => {
				// this.wisibel.setQuality("low");
				console.log("on wisibel loaded");
				setTimeout(() => {
					// this.changeCameras();
				}, 200);
			},
		})
	}
	private cameras: string[] = ["Vattenskidbåge", "Motor", "Dynor", "Fiskedäck"];l
	private cameraIndex: number = 0;
	
	private low: boolean = false;
	private changeCameras() {
		setInterval(() => {
			
			this.wisibel.setQuality(this.low ? "high" : "low");
			this.low = !this.low;
			
			// let camera = this.cameras[this.cameraIndex];
			// this.wisibel.clickMenuButtonByTextEN(camera);
			// this.cameraIndex++;
			// if (this.cameraIndex == this.cameras.length)
			// 	this.cameraIndex = 0;
		}, 2500);
	}

	// Key value store menu buttons by text
	private onWisibelMenuFetched(menu: Menu) {

		let menuButtonsByText = {};

		menu.ButtonSections.forEach(buttonSection => {
			buttonSection.MenuButtons.forEach(menuButton => {
				menuButtonsByText[menuButton.TextEN] = menuButton;
			});
		});

		this.menuButtonsByText = menuButtonsByText;
	}

	public clickMenuButtonByText(text: string) {
		if (text) {
			this.wisibel.clickMenuButtonByTextEN(text);
		}
	}

	loadMenuButton(menuButtonTextEN: string) {
		let menuButton: MenuButton = this.menuButtonsByText[menuButtonTextEN];
		if (menuButton) {
			this.wisibel.onMenuButtonClick(menuButton)
		} else {
			console.error("Couldnt find menubutton", menuButtonTextEN, this.menuButtonsByText);
		}
	}

	/**
	 * Match 'motorName' to the designs of the component with context name 'all_motors' in wisibel
	 */
	loadMotor(motorName: string) {
		this.wisibel.swapDesignInComponentByContextName(motorName, "all_motors");
	}


	// Both motors (diesel & electric) have these colors
	public availableMotorColors: string[] = [
		"Blue",
		"Green",
		"Purple",
		"Red"
	];

	/**
	 * Both motor components (diesel & electric) have context name 'motor' in wisibel,
	 * and finds the one that's loaded or ignores if cant find
	 */
	changeMotorColor(colorName: string) {
		this.wisibel.swapDesignMaterialInComponentByContextName(colorName, "motor");
	}

}
