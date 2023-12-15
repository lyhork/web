import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { HelpersNavigationService, NavigationComponent } from 'helpers/components/navigation';

@Component({
    selector: 'languages',
    templateUrl: './languages.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _helpersNavigationService: HelpersNavigationService,
        private _translocoService: TranslocoService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe((activeLang) => {

            // Get the active lang
            this.activeLang = activeLang;

            // Update the navigation
            this._updateNavigation(activeLang);
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'en': 'en',
            'kh': 'kh'
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        const navComponent = this._helpersNavigationService.getComponent<NavigationComponent>('mainNavigation');

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the flat navigation data
        const navigation = navComponent.navigation;

        // Get the dashboard item and update its title
        const dashboardItem = this._helpersNavigationService.getItem('dashboard', navigation);
        if (dashboardItem) {
            this._translocoService.selectTranslate('Dashboard').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    dashboardItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the regulator item and update its title
        const regulatorItem = this._helpersNavigationService.getItem('regulator', navigation);
        if (regulatorItem) {
            this._translocoService.selectTranslate('Regulator').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    regulatorItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the dashboard item and update its title
        const allSurveyItem = this._helpersNavigationService.getItem('survey', navigation);
        if (allSurveyItem) {
            this._translocoService.selectTranslate('Survey').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    allSurveyItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the survey-type item and update its title
        const surveyTypeItem = this._helpersNavigationService.getItem('survey-type', navigation);
        if (surveyTypeItem) {
            this._translocoService.selectTranslate('Survey Type').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    surveyTypeItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the users item and update its title
        const userItem = this._helpersNavigationService.getItem('user', navigation);
        if (userItem) {
            this._translocoService.selectTranslate('Users').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    userItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }

        // Get the profile item and update its title
        const myProfileItem = this._helpersNavigationService.getItem('profile', navigation);
        if (myProfileItem) {
            this._translocoService.selectTranslate('Profile').pipe(take(1))
                .subscribe((translation) => {

                    // Set the title
                    myProfileItem.title = translation;

                    // Refresh the navigation component
                    navComponent.refresh();
                });
        }
    }
}
