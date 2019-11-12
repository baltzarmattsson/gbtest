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

	private tenantSlug: string = "gobrave";

	private configurator1Slug: string = "boattester";
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

	public menuButtonsByText: { [nameEN: string]: MenuButton } = null;

	private initWisibelConfigurator(configuratorSlug: string) {

		console.log(this.wisibelContainer);

		this.menuButtonsByText = null;

		this.wisibel.initConfigurator({
			configuratorSlug: configuratorSlug,
			tenantSlug: this.tenantSlug,
			menuCb: (menu: Menu) => {
				this.onWisibelMenuFetched(menu);
			},
			onContextNameClicked: () => { },
			rendererElement: this.wisibelContainer,
			cb: () => {
				console.log("on wisibel loaded");

			},
		})
	}

	private onWisibelMenuFetched(menu: Menu) {

		let menuButtonsByText = {};

		menu.ButtonSections.forEach(bs => {
			bs.MenuButtons.forEach(mb => {
				menuButtonsByText[mb.TextEN] = mb;
			})
		})

		// setTimeout(() => {
		this.menuButtonsByText = menuButtonsByText;
		// }, 0);
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

	public availableMotorColors: string[] = [
		"Blue",
		"Green",
		"Purple",
		"Red"
	]

	/**
	 * Both motor components (diesel & electric) have context name 'motor' in wisibel
	 */
	changeMotorColor(colorName: string) {
		this.wisibel.swapDesignMaterialInComponentByContextName(colorName, "motor");
	}

}
